import { useEffect, useState } from "react"
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from "react-places-autocomplete";

export default function EditClinic() {
    const [formData, setFormData] = useState({
        address: "Jakarta",
        latlng: {}
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        // document.getElementById('note_modal').checked = false;

    }
    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
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
                    className: 'location-search-input input input-primary',
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

    // useEffect(() => {
    //     // console.log(formData)
    // }, [formData])


    return (
        <div className=" w-full h-full bg-[#eafdfc] p-8 rounded-md">
            <form onSubmit={handleSubmit} className="flex gap-4">
                <PlacesAutocomplete
                    name="address"
                    value={formData.address}
                    onChange={handleChangeAddress}
                    onSelect={handleSelect}
                >
                    {renderFunc}
                </PlacesAutocomplete>

                <button className="btn btn-primary"> submit</button>
            </form>
        </div>
    )
}