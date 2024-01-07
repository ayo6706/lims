import axios from "axios";
interface ModalFormProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  refreshData: () => void; 
}

export default function ModalForm({ setError, refreshData }: ModalFormProps) {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      description: event.target.description.value,
      currentStock: Number(event.target.currentStock.value),
      reorderLevel: Number(event.target.reorderLevel.value),
      optimalStockLevel: Number(event.target.optimalStockLevel.value),
      leadTimeDays: Number(event.target.leadTimeDays.value),
    };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/inventory', formData);
      alert(response.data.message)
      event.currentTarget.reset();
      refreshData();
    } catch (error) {
      setError('Failed to create inventory');
    }
  };

  return (

    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Inventory</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" id="name" placeholder="drug name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                  <textarea className="form-control" name="description" id="description" rows={3}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Stock</label>
                  <input type="number" className="form-control" name="currentStock" id="currentStock" placeholder="total units of products" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Reorder Level</label>
                  <input type="number" className="form-control" name="reorderLevel" id="reorderLevel" placeholder="minimum stock or unit required" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Optimal Stock Level</label>
                  <input type="number" className="form-control" name="optimalStockLevel" id="optimalStockLevel" placeholder="maximum stock Level" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Lead Time(Days)</label>
                  <input type="number" className="form-control" name="leadTimeDays" id="leadTimeDays" placeholder="duration of delivery" />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}