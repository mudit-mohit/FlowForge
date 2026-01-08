from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List

app = FastAPI()

# Allow CORS from frontend dev server(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: Dict[str, Any] = Body(...)):
    """Expect JSON payload with `nodes` and `edges` arrays.

    Returns: { num_nodes, num_edges, is_dag }
    """
    nodes: List[Dict[str, Any]] = payload.get('nodes', []) or []
    edges: List[Dict[str, Any]] = payload.get('edges', []) or []

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency and indegree for Kahn's algorithm
    node_ids = {n.get('id') for n in nodes}
    adj = {nid: [] for nid in node_ids}
    indegree = {nid: 0 for nid in node_ids}

    for e in edges:
        src = e.get('source')
        tgt = e.get('target')
        # Only consider edges between known nodes
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            indegree[tgt] = indegree.get(tgt, 0) + 1

    # Kahn's algorithm
    zero = [n for n, deg in indegree.items() if deg == 0]
    visited = 0
    from collections import deque
    dq = deque(zero)
    while dq:
        u = dq.popleft()
        visited += 1
        for v in adj.get(u, []):
            indegree[v] -= 1
            if indegree[v] == 0:
                dq.append(v)

    is_dag = visited == num_nodes if num_nodes > 0 else True

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
