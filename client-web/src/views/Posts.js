import PostsTable from "../components/Tables/PostsTable";
import { useState } from "react";
import FormData from "form-data"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST, GET_POSTS } from "../queries/posts";
import LoadingScreen from "../components/LoadingScreen";
import client from "../config/apollo";
import Swal from "sweetalert2";


export default function Posts() {
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        news: "",
        petshopId: Number(localStorage.getItem("petshopId"))
    })

    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const fileData = new FormData()
    const handleFile = async ({ files }) => {
        const [file] = files
        // console.log(file, "<<<<<<<<<<")
        fileData.append('file', file);
        // console.log(fileData.get('file'))
        setFormData({
            ...formData,
            imageUrl: await fileData.get('file')
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(formData)
        await addPost({
            variables: formData
        })

        await client.refetchQueries({
            include: "active"
        })
    }

    const [addPost, response] = useMutation(ADD_POST)
    const loadingAdd = response.loading
    const errorAdd = response.error
    const dataAdd = response.data
    const resetAdd = response.reset

    const { loading, error, data, reset } = useQuery(GET_POSTS, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })

    if (dataAdd) {
        // document.getElementById('post_modal').checked = false;
        // console.log(data)
    }

    if (error) {
        console.log({ error }, "<<<<<<<<<")
        Swal.fire({
            icon: 'error',
            text: error.message,
        })
            .finally(() => {
                reset()
            })
    } else if (errorAdd) {
        console.log({ errorAdd }, "<<<<<<<<<")
        Swal.fire({
            icon: 'error',
            text: errorAdd.message,
        })
            .finally(() => {
                resetAdd()
            })
    }

    if (loading || loadingAdd) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className=" flex justify-between items-center ">
                <div className="text-3xl pb-4 font-bold outline-1 outline-black text-[#ff9787]">
                    Clinic Posts
                </div>
                <label htmlFor="post_modal" className=" flex font-semibold hover:cursor-pointer py-4 px-4  rounded-md bg-[#ff9787] hover:bg-[#ffa99b] active:bg-[#ff9787] active:scale-95 duration-200 ">
                    <span className=" mr-2">
                        <svg fill="none" className=" p-0 w-6" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </span>
                    <span className=" select-none">
                        Add Post
                    </span>
                </label>
            </div>
            <PostsTable posts={data.fetchPost} />
            {/* add post modal */}
            <div>
                <input type="checkbox" id="post_modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box ml-72 p-4">
                        <form onSubmit={submitForm}>
                            <h3 className="text-xl font-bold mb-4">Add Post</h3>
                            <label>
                                Title :
                            </label>
                            <input name="title" value={formData.title} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter post title" className=" my-2 input input-secondary input-bordered w-full" />
                            <div className=" flex flex-col ">
                                <label> Content: </label>
                                <textarea name="news" value={formData.news} onChange={({ target }) => handleChange(target)} className="textarea my-2 textarea-secondary h-32" placeholder="Enter post content"></textarea>
                            </div>
                            <div className=" flex flex-col">
                                <label> Image URL : </label>
                                <input name="imageUrl" onChange={({ target }) => handleFile(target)} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                            </div>
                            <div className=" flex justify-end gap-4 mt-4">
                                <label htmlFor="post_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Cancel
                                    </span>
                                </label>
                                <button typeof="submit" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Add
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}