import Footer from "../Footer";
import Header from "../Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const Update = () => {
    const [postdata,setpostdata]=useState({});
    const {id}= useParams();
    const [title,settitle]=useState('')
    const [img,setimg]=useState('')
    const [body,setbody]=useState('')
    const [author,setauthor]=useState('')
    function handlechange(e){
        const {value,name}=e.target;
        switch (name) {
            case "title":
                settitle(value);
                break;
            case "img":
                setimg(value);
                break;
            case "body":
                setbody(value);
                break;
            case "author":
                setauthor(value);
                console.log(value);
                break;
        }
        name==="author"?setauthor(name):setauthor((e)=>e);
        setpostdata({...postdata,[name]:value});
        console.log(postdata);
    }
    useEffect(()=>{
        fetch(`http://localhost:5000/posts/${parseInt(id)}`)
        .then((res)=>res.json())
        .then((data)=>{
            settitle(data.title);
            setimg(data.img);
            setbody(data.body);
            setauthor(data.author);
        })
    },[])
    function submitfunc(e){
        e.preventDefault();
        fetch(`http://localhost:5000/posts/${parseInt(id)}`,{
            method:"PATCH",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                title:title,
                img:img,
                body:body,
                author:author
            }),
        }).then(()=>{
            alert('post Updated ');
            window.location.pathname='/';
        })
    }
    return (
        <>
        <Header/>
            <section className="create-post">
                <h2>Add New Post</h2>
                <form onSubmit={submitfunc}>
                    <label>Blog title :</label>
                    <input type="text" required name="title" value={title} onChange={(e)=>handlechange(e)} />
                    <label>Blog Image :</label>
                    <input type="url" required name="img" value={img} onChange={(e)=>handlechange(e)} />
                    <label>Blog body :</label>
                    <textarea required rows={"10"} name="body" value={body} onChange={(e)=>handlechange(e)}></textarea>
                    <label>Blog author :</label>
                    <select name="author" value={author} onChange={(e)=>handlechange(e)}>
                        <option disabled></option>
                        <option value={"admin"}>admin</option>
                        <option value={"Coder"}>Coder</option>
                    </select>
                    <button className="btn" type="submmit">
                        Update Blog
                    </button>
                </form>
            </section>
            {/* <Footer/> */}
        </>
    )
}
export default Update;