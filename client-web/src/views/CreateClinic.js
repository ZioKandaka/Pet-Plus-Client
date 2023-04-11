import { NavLink } from "react-router-dom"
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import { useState } from "react";


export default function CreateClinic() {
    const [formData, setFormData] = useState({
        name: "",
        logo: "",
        phoneNumber: "",
        address: "",
        latlng: {}
    })

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
                    placeholder: 'Enter the address of your clinic',
                    className: 'location-search-input input input-secondary w-full',
                })}
            />
            <div className="autocomplete-dropdown-container absolute rounded-lg bg-transparent">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                        ? 'suggestion-item--active p-2'
                        : 'suggestion-item p-2';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#eeeeee', cursor: 'pointer' };
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

    return (
        <div className=" w-screen h-screen bg-[#eafdfc] flex justify-center items-center">
            <div className="flex w-3/5 h-3/4 bg-white rounded-md shadow-md">
                <div className=" w-1/2 p-6">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold">Register Clinic</h1>
                    </div>
                    <div className="text-sm breadcrumbs mt-4">
                        <ul>
                            <li><label className=" link cursor-default font-semibold text-gray-400"> Create Account</label></li>
                            <li><label className=" link cursor-default font-semibold"> Manage Clinic</label></li>
                        </ul>
                    </div>
                    <form className=" mt-2">
                        <div>
                            <div className=" py-2"> Name :</div>
                            <input type="text" placeholder="Enter your clinic name" className="input input-bordered input-secondary w-full " />
                        </div>
                        <div>
                            <div className=" py-2"> Contact Number :</div>
                            <input type="text" placeholder="Enter your clinic's contact number" className="input input-bordered input-secondary w-full " />
                        </div>
                        <div className="">
                            <div className=" py-2"> Address :</div>
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
                            <div className=" py-2">
                                Logo :
                            </div>
                            <input type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                        </div>
                        <button type="submit" className=" mt-6 flex justify-center font-semibold hover:cursor-pointer py-3 px-4 w-full rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                            <span className=" select-none">
                                Register Clinic
                            </span>
                        </button >
                    </form>
                </div>
                <div className=" rounded-r-md  w-1/2 border-l-2 bg-gray-700  flex justify-center items-center">
                    <img src="https://i.ibb.co/GFFRCg7/Logo2-removebg.png" className="h-28 my-10" />
                </div>
            </div>
        </div>
    )
}
