import React, { useContext } from 'react'
import { TextInput, Group, Select } from '@mantine/core'
import ProfilesContext from '../../services/ProfilesContext'
import Countries from "../../data/countries.json"
import { inputStyle, selectStyle } from './styles'



const Shipping = () => {
    const { profile, onChangeHandler } = useContext(ProfilesContext)


    return (
        <>
            <Group position="center" spacing="sm" grow>
                <TextInput
                    placeholder="John Doe"
                    label="Full Name"
                    radius="md"
                    variant='default'
                    required
                    defaultValue={profile.shippingAddress.name}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.name') }}
                    styles={inputStyle}
                />
                <TextInput
                    placeholder="JohnDoe@gmail.com"
                    label="Email"
                    defaultValue={profile.shippingAddress.email}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.email') }}
                    radius="md"
                    required
                    variant='default'
                    styles={inputStyle}
                />
            </Group>
            <Group position="center" spacing="sm" grow>
                <TextInput
                    placeholder="6666666666"
                    label="Phone Number"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.shippingAddress.phone}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.phone') }}
                    styles={inputStyle}

                />
                <TextInput
                    placeholder="33333"
                    label="Zip Code"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.shippingAddress.postCode}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.postCode') }}
                    styles={inputStyle}
                />
            </Group>
            <Group position="center" spacing="sm" grow>
                <TextInput
                    placeholder="1234 Main St"
                    label="Address"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.shippingAddress.line1}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.line1') }}
                    styles={inputStyle}
                />
                <TextInput
                    placeholder="Apt #"
                    label="Address 2"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.shippingAddress.line2}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.line2') }}
                    styles={inputStyle}
                />
            </Group>

            <Group position="center" spacing="md">
                <TextInput
                    placeholder="New York"
                    label="City"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.shippingAddress.city}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'shippingAddress.city') }}
                    styles={inputStyle}
                />
                <Select
                    label="State"
                    placeholder="New York"
                    searchable
                    nothingFound="No options"
                    clearable
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    data={Countries.provinces.map(province => { return { label: province.name, value: province.name } })}
                    defaultValue={profile.shippingAddress.state}
                    onChange={(value) => { onChangeHandler(value, 'shippingAddress.state') }}
                    styles={selectStyle}
                />
                <Select
                    label="Country"
                    placeholder="United States"
                    searchable
                    nothingFound="No options"
                    clearable
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    defaultValue={profile.shippingAddress.country}
                    onChange={(value) => { onChangeHandler(value, 'shippingAddress.country') }}
                    styles={selectStyle}
                    data={[
                        { value: 'United States', label: 'United States' },
                    ]}
                />

            </Group>


        </>
    )
}

export default Shipping