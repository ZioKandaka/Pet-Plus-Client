import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react"
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import LoadingScreen from "../components/LoadingScreen";
import ServiceTable from "../components/Tables/ServiceTable";
import { GET_PETSHOP } from "../queries/petshop";
import { GET_SERVICES, POST_SERVICE } from "../queries/services";
import FormData from "form-data"


export default function EditClinic() {
    const [formData, setFormData] = useState({
        name: localStorage.getItem("petshopName"),
        logo: "",
        phoneNumber: localStorage.getItem("petshopNumber"),
        address: localStorage.getItem("petshopAddress"),
        latlng: {
            lat: localStorage.getItem("petshopLat"),
            lng: localStorage.getItem("petshopLon")
        },
        id: Number(localStorage.getItem("petshopId"))
    })

    const [formService, setFormService] = useState({
        name: "",
        minPrice: "",
        maxPrice: "",
        serviceLogo: "",
        petshopId: Number(localStorage.getItem("petshopId")),
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        // document.getElementById('note_modal').checked = false;
    }

    const [postService, resService] = useMutation(POST_SERVICE)

    const submitService = async (e) => {
        e.preventDefault();
        // console.log(formService)
        setFormService({
            ...formService,
            minPrice: Number(formService.minPrice),
            maxPrice: Number(formService.maxPrice),
            petshopId: Number(localStorage.getItem("petshopId")),
        })
        console.log(formService)
        await postService({
            variables: formService
        })
        // document.getElementById('note_modal').checked = false;
    }

    const fileData = new FormData()
    const handleFile = async ({ files }) => {
        const [file] = files
        // console.log(file, "<<<<<<<<<<")
        fileData.append('file', file);
        // console.log(fileData.get('file'))
        setFormService({
            ...formService,
            serviceLogo: await fileData.get('file')
        })
    }

    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const serviceChange = ({ name, value }) => {
        setFormService({
            ...formService,
            [name]: value
        })
    }
    const handleChangeAddress = value => {
        setFormData({
            ...formData,
            address: value
        })
    }
    const handleSelect = async (address) => {
        try {
            const res = await geocodeByAddress(address)
            console.log(res)
            const latlng = await getLatLng(res[0])
            setFormData({
                ...formData,
                latlng
            })
            console.log(latlng)
        } catch (error) {
            console.log(error)
        }
    }

    const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
            <input
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input input input-secondary w-full',
                })}
            />
            <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )

    const { loading, error, data } = useQuery(GET_SERVICES, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })
    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className=" w-full h-full flex rounded-md gap-4">
            <div className="w-1/3">
                <div className="text-3xl pb-4 font-bold outline-1 flex justify-center my-8 border-b-2 border[#b0bfbf] outline-black text-[#ff9787]">
                    Clinic Profile
                </div>
                <div className="flex bg-[#eafdfc] shadow-md  h-2/3 p-4 rounded-md">
                    <form onSubmit={handleSubmit} className="flex gap-4 flex-col w-full">
                        <div className=" text-2xl font-bold">
                            Edit Info
                        </div>
                        <div>
                            <label>
                                Name :
                            </label>
                            <input name="name" value={formData.name} onChange={({ target }) => handleChange(target)} type="text" placeholder="Type here" className="input input-bordered input-secondary w-full" />
                        </div>
                        <div>

                            <label>
                                Phone Number :
                            </label>
                            <input name="phoneNumber" value={formData.phoneNumber} onChange={({ target }) => handleChange(target)} type="text" placeholder="Type here" className="input input-bordered input-secondary w-full" />
                        </div>

                        <div>
                            <label>
                                Address :
                            </label>
                            <PlacesAutocomplete
                                name="address"
                                value={formData.address}
                                onChange={handleChangeAddress}
                                onSelect={handleSelect}
                            >
                                {renderFunc}
                            </PlacesAutocomplete>
                        </div>

                        <div className="">
                            <label>
                                Logo :
                            </label>
                            <input type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                        </div>
                        <button type="submit" className=" flex justify-center font-semibold hover:cursor-pointer py-3 px-4 w-full rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                            <span className=" select-none">
                                Edit
                            </span>
                        </button >
                    </form>
                </div>
            </div>
            <div className=" bg-[#eafdfc] h-full w-2/3 p-4 rounded-md shadow-md">
                <div className=" flex justify-between items-center pb-4">
                    <div className=" text-2xl font-bold">
                        Service List
                    </div>
                    <div>
                        <label htmlFor="service_modal" className=" flex font-semibold hover:cursor-pointer py-4 px-4  rounded-md bg-[#ff9787] hover:bg-[#ffa99b] active:bg-[#ff9787] active:scale-95 duration-200 ">
                            <span className=" mr-2">
                                <svg fill="none" stroke="currentColor" className=" p-0 w-6 items-center flex" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <span className=" select-none">
                                Add Service
                            </span>
                        </label>
                    </div>
                </div>
                <ServiceTable services={data.fetchService} />
            </div>
            <div>
                {/* add service modal */}
                <div>
                    <input type="checkbox" id="service_modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box ml-72 p-4">
                            <form onSubmit={submitService}>
                                <h3 className="text-xl font-bold mb-4">Add Service</h3>
                                <label>
                                    Name :
                                </label>
                                <input name="name" value={formService.name} onChange={({ target }) => serviceChange(target)} type="text" placeholder="Enter service name" className=" my-2 input input-bordered w-full input-secondary" />
                                <div className=" flex  gap-2">
                                    <div>
                                        <label>
                                            Min Price :
                                        </label>
                                        <input name="minPrice" value={formService.minPrice} onChange={({ target }) => serviceChange(target)} type="number" placeholder="Enter minimum price" className=" my-2 input input-bordered w-full input-secondary" />
                                    </div>
                                    <div>
                                        <label>
                                            Max Price :
                                        </label>
                                        <input name="maxPrice" value={formService.maxPrice} onChange={({ target }) => serviceChange(target)} type="number" placeholder="Enter maximum price" className=" my-2 input input-bordered w-full input-secondary" />
                                    </div>
                                </div>
                                <div className=" flex flex-col">
                                    <label> Logo : </label>
                                    <input name="imageUrl" onChange={({ target }) => handleFile(target)} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                                </div>
                                <div className=" flex justify-end gap-4 mt-4">
                                    <label htmlFor="service_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
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
        </div>
    )
}