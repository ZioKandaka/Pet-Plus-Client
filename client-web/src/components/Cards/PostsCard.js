import { useState } from "react";
import FormData from "form-data"
import { useMutation } from "@apollo/client";
import { EDIT_POST, GET_POSTS } from "../../queries/posts";
import { REGISTER_USER } from "../../queries/users";
import client from "../../config/apollo";
import LoadingScreen from "../LoadingScreen";

export default function PostsCard({ post }) {
    const [formData, setFormData] = useState({
        title: post.title,
        imageUrl: "",
        news: post.news,
        petshopId: Number(localStorage.getItem("petshopId")),
        postId: post.id,
        status: post.status
    })

    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const fileData = new FormData()
    const handleFile = async ({ files }) => {
        console.log(formData)
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
        await editPost({ variables: formData })

        await client.refetchQueries({
            include: "active",
        });

        document.getElementById(`edit_post_${post.id}`).checked = false;
    }

    const active = () => {
        return (
            <span className=" bg-green-200 p-4 pt-1 pb-2 rounded-full">
                active
            </span>
        )
    }

    const archived = () => {
        return (
            <span className=" bg-amber-200 p-4 pt-1 pb-2 rounded-full">
                archived
            </span>
        )
    }
    const [editPost, { loading, error, data }] = useMutation(EDIT_POST)


    if (loading) {
        return <LoadingScreen />
    }


    return (
        <div className=" shadow-md h-24 my-4 rounded-xl p-2 w-full flex items-center bg-[#eafdfc]">
            <div className="  p-4 w-5/12 ">
                <div className="font-semibold">
                    {post.title}
                </div>
            </div>
            <div className=" pr-4 w-2/12">
                <label htmlFor={`image_${post.id}`} >
                    <img className="rounded-md hover:cursor-pointer" src={post.imageUrl} />
                </label>
            </div>
            <div className=" w-2/12">
                {
                    post.status === "Active" ? active() : archived()
                }
            </div>
            <div className="  w-2/12">
                <label htmlFor={`content_${post.id}`} className=" hover:cursor-pointer select-nones bg-sky-200 p-2 px-6 pt-1 pb-2 rounded-full">
                    view
                </label>
            </div>
            <div className=" w-1/12 dropdown dropdown-end">
                <svg tabIndex={0} fill="none" className=" hover:bg-[#d4e6e6] duration-200 rounded-md active:scale-95  active:bg-[#ff9787] w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><label htmlFor={`edit_post_${post.id}`}>Edit</label></li>
                    <li><label>Archive</label></li>
                </ul>
            </div>

            {/* image modal */}
            <input type="checkbox" id={`image_${post.id}`} className="modal-toggle" />
            <label htmlFor={`image_${post.id}`} className="modal cursor-pointer">
                <label className="modal-box relative  ml-72" htmlFor="">
                    <h3 className="text-lg font-bold">Post Image</h3>
                    <img src={post.imageUrl} />
                </label>
            </label>

            {/* view content modal */}
            <div>
                <input type="checkbox" id={`content_${post.id}`} class="modal-toggle" />
                <div class="modal  ml-72">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">{post.title}</h3>
                        <p class="py-4">{post.news}</p>
                        <div class="modal-action">
                            <label for={`content_${post.id}`} class="btn">Done</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* add post modal */}
            <div>
                <input type="checkbox" id={`edit_post_${post.id}`} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box ml-72 p-4">
                        <form onSubmit={submitForm}>
                            <h3 className="text-xl font-bold mb-4">Edit Post</h3>
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
                                <label htmlFor={`edit_post_${post.id}`} className=" flex font-semibold justify-center  hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Cancel
                                    </span>
                                </label>
                                <button typeof="submit" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Done
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}