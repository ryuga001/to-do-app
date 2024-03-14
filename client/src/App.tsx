import axios from "axios";
import { useEffect, useState } from "react";

type FormType = {
  title: string,
  note: string,

}
type DataType = {
  title: string,
  note: string,
  _id: string,
}
axios.defaults.baseURL = "http://localhost:5000/";

const App = () => {

  const [allNote, setAllNote] = useState<DataType[]>([]);
  // const [isEdit, setIsEdit] = useState(false);
  const fetchData = async () => {
    const response = await axios.get("/");
    if (response.data.success) {
      console.log(response.data.data);
      setAllNote(response.data.data);
    }
  }
  useEffect((() => {
    fetchData();
    console.log(allNote);
  }
  ), []);

  const [formData, setFormData] = useState<FormType>({
    title: "",
    note: "",
  })
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return (
        { ...prev, [name]: value }
      )
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success === true) {
      alert(data.data.message);
    }
    fetchData();
  }
  const deleteNote = async (id: string) => {
    const response = await axios.delete(`/delete/` + id)
    if (response.data.success) {
      alert(response.data.message);
      fetchData();
    }
  }
  return (
    <>
      <div className="creation_box">
        <form onSubmit={handleSubmit}>
          <div className="input_div">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" onChange={handleOnChange} />
          </div>
          <div className="input_div">
            <label htmlFor="note">Discription</label>
            <input type="text" id="note" name="note" onChange={handleOnChange} />
          </div>
          <div className="input_div">
            <button disabled={(((formData.title.length > 0) && (formData.note.length > 0)) ? false : true)}>ADD</button>
          </div>
        </form>
      </div>
      <div className="table_content">

        {
          allNote.map((item, index) => {
            return (
              <div key={index} className="Single_Note">
                <h3>{item.title}</h3>
                <p>
                  {item.note}
                  <div >
                    {/* <button style={{ backgroundColor: "green" }} >Edit</button> */}
                    <button style={{ backgroundColor: "red" }} onClick={() => deleteNote(item._id)}>Delete</button>
                  </div>
                </p>
              </div >
            )
          })
        }
      </div >
    </>
  )
}

export default App