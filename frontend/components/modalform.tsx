export default function ModalForm() {
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
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="drug name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Stock</label>
                  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="total units of products" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Reorder Level</label>
                  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="minimum stock or unit required" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Optimal Stock Level</label>
                  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="maximum stock Level" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Lead Time(Days)</label>
                  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="duration of delivery" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}