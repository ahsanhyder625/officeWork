import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { Modal } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import DialogModal from './ConfirmationModal'
import SortIcon from '@mui/icons-material/Sort';
import moment from 'moment'

export default function MainContent() {
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [btnMsg, setBtnMsg] = useState("");
  const [tableEnteries, settableEnteries] = useState([]);
  // const [pages, setPages] = React.useState([])
  const [activePage, setActivepage] = React.useState(1)
  const [entries, setEntries] = useState(5)
  const [perPage, setPerPage] = useState(5)
  // const [isNext,setIsNext] = useState(true)
  const [open, setOpen] = useState(false);
  const [modalPage, setModalPage] = useState("");
  const [modId, setModId] = useState(null)
  const [crSort, setCrSort] = useState(false)
  const [modSort, setModSort] = useState(false)
  const [qtySort, setQtySort] = useState(false)
  const [editData, setEditData] = useState("")
  const handleClose = () => {
    setOpen(false);
  }; 

  const handleDelete = () => {
    setOpen(false)
    if(modId){
      let updateTableEnteries = tableEnteries.filter(item => item.id != modId && item)
      settableEnteries(updateTableEnteries)
    }
  }

  const handleSave = (modItem,modQty) => {
    setOpen(false)
    let editTableData = tableEnteries.map((item) => item.id==modId ? {...item,itemName:modItem,itemQty:modQty,modifiedAt: Date(Date.now()).toString()}:item)
    settableEnteries([...editTableData])
    handleSort("modified",editTableData)
  }
  const handlePerPage = (num) => {
    setPerPage(Number(num));
    setEntries(Number(num))
    setActivepage(1);
  };

  const handlePages = (e, active) => {
    // console.log(entries)
    if (active === "prev") {
      // if (Number(activePage) === 1) {
      //   setActivepage(pages.length);
      // } else {
      //   setActivepage(activePage - 1);
      // }
      
      
        if(tableEnteries && tableEnteries.length>0){
          setActivepage(activePage - 1)
          setEntries(entries-perPage)
          // setIsNext(true)
        }

    } else if (active === "next") {
      
        if(tableEnteries && tableEnteries.length>0){
          setActivepage(activePage + 1)
          setEntries(entries+perPage)
        
        }
  
    } else {
      setActivepage(active);
    }
  };
  const handleItemChange = (e) => {
    // console.log(e.target.value);
    setItemName(e.target.value);
  };
  const handleQtyChange = (e) => {
    // console.log(e.target.value);
    setItemQty(e.target.value);
  };
  const handleSort = (input,editTableData) => {
    let updatedEnt
    if(editTableData){
      !modSort ?
      updatedEnt = editTableData.sort(function(a, b) {
        var c = new Date(a.modifiedAt).getTime();
        var d = new Date(b.modifiedAt).getTime();  
        // console.log(c, d ,"C" ,"D")
        // setCrSort(true)
        setModSort(true)
        return d-c
        // return c-d;
    }):
    updatedEnt = editTableData.sort(function(a, b) {
      var c = new Date(a.modifiedAt).getTime();
      var d = new Date(b.modifiedAt).getTime();  
      // console.log(c, d ,"C" ,"D")
      // return d-c
      setModSort(false)
      return c-d;
  })
  sessionStorage.setItem("storedTableData",JSON.stringify({data:[...updatedEnt]}))

    }
    else{

    if(input=="create"){
    !crSort ?
    updatedEnt = tableEnteries.sort(function(a, b) {
      var c = new Date(a.createdAt).getTime();
      var d = new Date(b.createdAt).getTime();  
      // console.log(c, d ,"C" ,"D")
      setCrSort(true)
      return d-c
      // return c-d;
  }):
  updatedEnt = tableEnteries.sort(function(a, b) {
    var c = new Date(a.createdAt).getTime();
    var d = new Date(b.createdAt).getTime();  
    // console.log(c, d ,"C" ,"D")
    // return d-c
    setCrSort(false)
    return c-d;
})
    }
    else{
      !modSort ?
    updatedEnt = tableEnteries.sort(function(a, b) {
      var c = new Date(a.modifiedAt).getTime();
      var d = new Date(b.modifiedAt).getTime();  
      // console.log(c, d ,"C" ,"D")
      // setCrSort(true)
      setModSort(true)
      return d-c
      // return c-d;
  }):
  updatedEnt = tableEnteries.sort(function(a, b) {
    var c = new Date(a.modifiedAt).getTime();
    var d = new Date(b.modifiedAt).getTime();  
    // console.log(c, d ,"C" ,"D")
    // return d-c
    setModSort(false)
    return c-d;
})
    }
  }
  // setCrSort(true)
  // console.log(updatedEnt,"Sorted")
  settableEnteries([...updatedEnt])
  }
  const handleQtySort = () => {
    let qtyEnt
    !qtySort ?
   tableEnteries.sort(function(a, b) {
      var c = a.itemQty
      var d = b.itemQty  
      // console.log(c, d ,"C" ,"D")
      setQtySort(true)
      return d-c;
  }):
  tableEnteries.sort(function(a, b) {
    var c = a.itemQty
    var d = b.itemQty  
    // console.log(c, d ,"C" ,"D")
    setQtySort(false)
    return c-d;
})
  settableEnteries([...qtyEnt])
  }
  const handleSubmitHover = () => {
      if(itemName == "" && itemQty == "") {
          setBtnMsg("Please enter item, and quantity to be recorded !")
      }
      else if(itemName == "" || itemQty == "") {
        setBtnMsg("Please check if the item, and quantity of the same are added!")
      }
  }

  const handleSubmit = () => {
    if(itemName == "" && itemQty == "") {
        setBtnMsg("Please enter item, and quantity to be recorded !")
    }
    else if(itemName == "" || itemQty == "") {
      setBtnMsg("Please check if the item, and quantity of the same are added!")
    }
    else{
        // const timeElapsed = Date.now();
        // const today = new Date(timeElapsed);
        let inputObj = {
          itemName:itemName,
          itemQty: itemQty,
            id:uuidv4(),
            createdAt: Date(Date.now()).toString(),
            modifiedAt: Date(Date.now()).toString()
         }
         sessionStorage.setItem("storedTableData",JSON.stringify({data:[...tableEnteries,inputObj]}))
        settableEnteries([...tableEnteries,inputObj]) 
        
         
    }
  }

  const handleClear = () => {
    settableEnteries("")
    sessionStorage.setItem("storedTableData",JSON.stringify({data:[]}))
  }

  useEffect(()=>{
    let storedData = JSON.parse(sessionStorage.getItem("storedTableData"))
    settableEnteries(storedData?storedData.data:[])
  }, [])

  return (
    <>
     <DialogModal
        open={open}
        handleClose={() => handleClose()}
        modalPage={modalPage}
        handleDelete={() => handleDelete()}
        handleSave={(editItemName, editItemQty) =>handleSave(editItemName, editItemQty)}
        editData={editData}
      />
      <div
        className="d-flex justify-content-start mx-5"
        style={{ marginTop: "90px" }}
      >
        <div>
          
          <div className="my-1">
            <TextField
              type="text"
              onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)"
              id="standard-basic"
              label="item name"
              variant="standard"
              onChange={handleItemChange}
            />
          </div>
          <div className="my-1">
            <TextField
              type="number"
              id="standard-basic"
              label="item quantity"
              variant="standard"
              onChange={handleQtyChange}
            />
          </div>
          <div
            style={{ width: "198px" }}
            type="button"
            class="btn btn-dark btn-block p-1 mt-3"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={btnMsg}
            onMouseEnter={handleSubmitHover}
            onClick={handleSubmit}
          >
            SUBMIT
          </div>
        </div>
      </div>
      { tableEnteries && tableEnteries.length>0 && 
      <div className="mt-3">
        <div className="d-flex justify-content-end">
          <div
            style={{ width: "168px" }}
            type="button"
            class="mx-2 btn btn-dark btn-block mt-3"
            onClick={handleClear}
          >
            CLEAR RECORD <ClearIcon />
          </div>
          {/* <div className="my-3 mx-3 cursor"><SortIcon /></div> */}
        </div>
        {
          tableEnteries && tableEnteries.length > 5 &&
        
        <div>
            <span>
                show
                <select
                  className="mx-2 border-none p-2"
                  value={perPage}
                  onChange={(e) => handlePerPage(e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                <span>entries</span>
              </span>
            </div>
}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              {/* <TableCell style={{ fontWeight: "bold" }}>
                  Sl.No
                </TableCell> */}
                <TableCell style={{ fontWeight: "bold" }}>
                  Created At {crSort ? <img style={{cursor:"pointer"}} onClick={()=>handleSort("create")} className="mx-1" src='/descending.png' alt="ascending" width='22px'/>
                  :<img style={{cursor:"pointer"}} onClick={()=>handleSort("create")} className="mx-1" src='/ascending.png' alt="ascending" width='22px'/>}
                   {/* <SortIcon onClick={()=>handleSort("create")} style={{cursor:"pointer"}} /> */}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Modified At  {modSort ? <img style={{cursor:"pointer"}} onClick={()=>handleSort("modified")} className="mx-1" src='/descending.png' alt="ascending" width='22px'/>
                  :<img style={{cursor:"pointer"}} onClick={()=>handleSort("modified")} className="mx-1" src='/ascending.png' alt="ascending" width='22px'/>}
                  {/* <SortIcon onClick={()=>handleSort("modified")} style={{cursor:"pointer"}} />   */}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Item 
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Quantity Available
                  {qtySort ? <img style={{cursor:"pointer"}} onClick={handleQtySort} className="mx-1" src='/descending.png' alt="ascending" width='22px'/>
                  :<img style={{cursor:"pointer"}} onClick={handleQtySort} className="mx-1" src='/ascending.png' alt="ascending" width='22px'/>}
                   {/* <SortIcon onClick={handleQtySort} className="cursor" /> */}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Edit
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                        {
                            tableEnteries && tableEnteries.length>0 && tableEnteries
                            .slice((activePage-1)*perPage, entries )?.map((eachEntry,eachIndex) => {
                                return(
                                    <>
                                         <TableRow key={eachEntry.id}>
                                            {/* <TableCell align="left">{eachIndex+activePage}</TableCell> */}
                                            <TableCell align="left">{moment(eachEntry.createdAt).format('DD/MM/yyyy  h:mm:ss a')}</TableCell>
                                            <TableCell align="left">{moment(eachEntry.modifiedAt).format('DD/MM/yyyy  h:mm:ss a')}</TableCell>
                                            <TableCell align="right">{eachEntry.itemName}</TableCell>
                                            <TableCell align="right">{eachEntry.itemQty == 0 ? <span className="text-danger">Out of stock!</span> : eachEntry.itemQty}</TableCell>
                                            <TableCell align="right">
                                            <EditIcon onClick={()=>{
                                              if(!open){
                                                setEditData(eachEntry)
                                                setModId(eachEntry.id)
                                                setModalPage("editItem")
                                                setOpen(true)
                                                
                                                
                                                
                                              }
                                            }} style={{ cursor: "pointer" }} />
                                            </TableCell>
                                            <TableCell align="right">
                                            <DeleteIcon onClick={()=>{
                                              if(!open){
                                                setOpen(true)
                                                setModalPage("deleteItem")
                                                setModId(eachEntry.id)
                                              }
                                            }} style={{ cursor: "pointer" }} />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }
             
            </TableBody>
          </Table>
        </TableContainer>
        {tableEnteries && tableEnteries.length > 5 && <div className="ml-3  text-left  d-flex justify-content-center">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          {
                              activePage !=1 ?  <span
                              className="border p-2 span-pages  text-dark"
                              onClick={(e) => handlePages(e, "prev")}
                              style={{cursor:"pointer"}}
                            >
                              &lt;
                            </span>: <span
                            className="border p-2 span-pages text-muted"
                            style={{cursor:"pointer",backgroundColor:"#cccccc"}}
                          >
                            &lt;
                          </span>
                          }
                         
                        </td>
                        <td>
                          <span className="px-4 span-pages">
                            <span
                              style={{ fontSize: "25px" }}
                              className="text-primary"
                            >
                              {activePage}
                            </span>
                          </span>
                        </td>
                        <td>
                          {
                              tableEnteries.length >= entries  ?
                           <span
                           className="border p-2 span-pages  text-dark"
                           style={{cursor:"pointer"}}
                           onClick={(e) => handlePages(e, "next")}
                         >
                           &gt;
                         </span>:
                          <span
                          className="border p-2 span-pages  text-muted"
                          style={{cursor:"pointer",backgroundColor:"#cccccc"}}
                        >
                          &gt;
                        </span>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>}
      </div>
}
    </>
  );
}
