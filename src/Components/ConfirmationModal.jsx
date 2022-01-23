import React, {useState,useEffect} from "react";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@mui/material/TextField";
export default function AlertConfirmDialog({
  open,
  handleClose,
  modalPage,
  handleDelete,
  handleSave,
  editData
}) {
    const [itemName, setItemName] = useState(editData && editData.itemName);
    const [itemQty, setItemQty] = useState(editData && editData.itemQty);

    const handleItemChange = (e) => {
        // console.log(e.target.value);
        setItemName(e.target.value);
      };
      const handleQtyChange = (e) => {
        // console.log(e.target.value);
        setItemQty(e.target.value);
      };
  // console.log(modalPage);
  // alert(modalPage)
useEffect(()=>{
    setItemName(editData && editData.itemName)
    setItemQty(editData && editData.itemQty)
}, [editData])
console.log(itemName,itemQty,"itemName","itemQty")
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <div className="">
                {" "}
                <div>
                  <div className="d-flex justify-content-end">
                    <div className="mt-2">
                      <h5 className="fw-bold text-dark">
                        {modalPage == "deleteItem" && (
                       <> Are you sure you want to delete?</>
                        )}
                      </h5>
                      <div className="d-flex justify-content-between">
                          {
                              modalPage == "editItem" && (
                                  <>
                                    <div className="mx-2"> <TextField
              type="text"
              value={itemName}
              onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)"
              id="standard-basic"
              label="item name"
              variant="standard"
              onChange={handleItemChange}
            /></div>
            <div className="mx-2">
           <TextField
              type="number"
              value={itemQty}
              id="standard-basic"
              label="item quantity"
              variant="standard"
              onChange={handleQtyChange}
            /></div>
                                  </>
                              )
                          }
                      </div>
                    </div>
                   
                    <div className="px-2">
                      <CloseIcon
                        style={{ fontSize: "22px" }}
                        className="cursor text-dark"
                        onClick={handleClose}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 mb-2">
                  <div className="pt-2">
                    <p
                      style={{ textDecoration: "underline", fontSize: "18px" }}
                      className="pt-1 px-2 cursor"
                      onClick={handleClose}
                    >
                      Cancel
                    </p>
                  </div>
                  <div className="mx-3">
                  {modalPage == "deleteItem" &&
                    <button
                      className="btn p-2 px-3"
                      style={{
                        backgroundColor: "#fc2779",
                        color: "white",
                        fontSize: "14px",
                      }}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>     
                  }
                  {modalPage == "editItem" && 
                   <button
                   className="btn p-2  px-3"
                   style={{
                     backgroundColor: "#fc2779",
                     color: "white",
                     fontSize: "14px",
                   }}
                   onClick={()=>handleSave(itemName,itemQty)}
                 >
                   Save
                 </button> 
                  }
                  </div>
                </div>
              </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}