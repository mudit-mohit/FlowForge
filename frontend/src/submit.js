import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((s) => ({ nodes: s.nodes, edges: s.edges }));

    const handleSubmit = async () => {
        try {
            const resp = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

                        if (!resp.ok) {
                                const text = await resp.text();
                                // fallback to alert if store or toast unavailable
                                try {
                                    const addToast = (await import('./store')).useStore.getState().addToast;
                                    addToast({ title: 'Error', message: `Server returned ${resp.status}: ${text}`, type: 'error', duration: 6000 });
                                } catch (e) {
                                    alert(`Error from server: ${resp.status} ${text}`);
                                }
                                return;
                        }

                        const json = await resp.json();
                        const { num_nodes, num_edges, is_dag } = json;
                        try {
                            const addToast = (await import('./store')).useStore.getState().addToast;
                            addToast({ title: 'Pipeline Parsed', message: `Nodes: ${num_nodes} • Edges: ${num_edges} • Is DAG: ${is_dag}`, type: 'success', duration: 7000 });
                        } catch (e) {
                            alert(`Pipeline parsed. Nodes: ${num_nodes}\nEdges: ${num_edges}\nIs DAG: ${is_dag}`);
                        }
        } catch (err) {
            alert('Failed to submit pipeline: ' + err.message);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default SubmitButton;
