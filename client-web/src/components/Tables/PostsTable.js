import PostsCard from "../Cards/PostsCard";

export default function PostsTable({ posts }) {
    return (
        <>
            <div className="flex justify-around border-b-2 border-[#b0bfbf] text-lg ">
                <div className=" pl-5 w-5/12">
                    Title
                </div>
                <div className=" w-2/12">
                    Post Image
                </div>
                <div className=" w-2/12">
                    Status
                </div>
                <div className=" w-2/12">
                    Content
                </div>
                <div className=" w-1/12">

                </div>
            </div>
            {
                posts?.map((el, i) => {
                    return (
                        <PostsCard key={i} post={el} />
                    )
                })
            }
        </>
    )
}