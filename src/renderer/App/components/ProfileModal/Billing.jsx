import React, { useContext } from 'react'
import { TextInput, Group, Select } from '@mantine/core'
import ProfilesContext from '../../services/ProfilesContext'
import Countries from '../../data/countries.json'
import { inputStyle, selectStyle } from "./styles"

const Billing = () => {

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
                    defaultValue={profile.billingAddress.name}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.name') }}
                    styles={inputStyle}
                />
                <TextInput
                    placeholder="JohnDoe@gmail.com"
                    label="Email"
                    defaultValue={profile.billingAddress.email}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.email') }}
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
                    defaultValue={profile.billingAddress.phone}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.phone') }}
                    styles={inputStyle}


                />
                <TextInput
                    placeholder="33333"
                    label="Zip Code"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.billingAddress.postCode}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.postCode') }}
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
                    defaultValue={profile.billingAddress.line1}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.line1') }}
                    styles={inputStyle}
                />
                <TextInput
                    placeholder="Apt #"
                    label="Address 2"
                    radius="md"
                    required
                    variant='default'
                    defaultValue={profile.billingAddress.line2}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.line2') }}
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
                    defaultValue={profile.billingAddress.city}
                    onChange={(e) => { onChangeHandler(e.currentTarget.value, 'billingAddress.city') }}
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
                    styles={selectStyle}
                    data={Countries.provinces.map(province => { return { label: province.name, value: province.name } })}
                    defaultValue={profile.billingAddress.state}
                    onChange={(value) => { onChangeHandler(value, 'billingAddress.state') }}
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
                    styles={selectStyle}
                    defaultValue={profile.billingAddress.country}
                    onChange={(value) => { onChangeHandler(value, 'billingAddress.country') }}
                    data={[
                        { value: 'United States', label: 'United States' },
                    ]}
                />

            </Group>
        </>
    )
}

export default Billing