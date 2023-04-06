import React, { useContext, useState } from 'react'
import { TextInput, Group, Select } from '@mantine/core'
import ProfilesContext from '../../services/ProfilesContext'
import { inputStyle, selectStyle } from './styles'
import Years from '../../data/years.json'
import Months from '../../data/months.json'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';

const Payment = () => {


    const { profile, setProfile, onChangeHandler } = useContext(ProfilesContext)
    const [focus, setFocus] = useState(undefined)

    const handleFocus = (type) => {
        setFocus(type)
    }

    const handleCardType = (type) => {
        const { issuer } = type
        setProfile({ ...profile, paymentDetails: { ...profile.paymentDetails, cardType: issuer } })
    }
    return (
        <>
            <Cards
                cvc={profile.paymentDetails.cardCvv}
                expiry={`${profile.paymentDetails.cardExpMonth}/${profile.paymentDetails.cardExpYear}`}
                focused={focus}
                name={profile.paymentDetails.nameOnCard}
                number={profile.paymentDetails.cardNumber}
                placeholders={{
                    name: 'John Doe',
                }}
                callback={(type) => { handleCardType(type) }}
            />
            <Group position="center" direction="column" spacing="md" grow >

                <TextInput
                    placeholder="John Doe"
                    label="Card Holder"
                    radius="md"
                    variant='default'
                    required
                    defaultValue={profile.paymentDetails.nameOnCard}
                    onChange={(e) => { { onChangeHandler(e.currentTarget.value, 'paymentDetails.nameOnCard'); handleFocus("name") } }}
                    styles={inputStyle}
                />
                <TextInput
                    placeholder="4242 4242 4242 4242"
                    label="Card Number"
                    radius="md"
                    variant='default'
                    required
                    defaultValue={profile.paymentDetails.cardNumber}
                    onChange={(e) => { { onChangeHandler(e.currentTarget.value, 'paymentDetails.cardNumber'); handleFocus("number") } }}
                    styles={inputStyle}
                />
            </Group>
            <Group position="center" spacing="md">
                <Select
                    label="Month"
                    placeholder="MM"
                    nothingFound="No options"
                    clearable
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    data={Months.map(month => month)}
                    defaultValue={profile.paymentDetails.cardExpMonth}
                    onChange={(value) => { { onChangeHandler(value, 'paymentDetails.cardExpMonth'); handleFocus("expiry") } }}
                    styles={selectStyle}
                />
                <Select
                    label="Year"
                    placeholder="YYYY"
                    nothingFound="No options"
                    clearable
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    defaultValue={profile.paymentDetails.cardExpYear}
                    onChange={(value) => { { onChangeHandler(value, 'paymentDetails.cardExpYear'); handleFocus('expiry') } }}
                    styles={selectStyle}
                    data={Years.map(year => year)}
                />
                <TextInput
                    placeholder="333"
                    label="CVC"
                    radius="md"
                    variant='default'
                    required
                    defaultValue={profile.paymentDetails.cardCvv}
                    onChange={(e) => { { onChangeHandler(e.currentTarget.value, 'paymentDetails.cardCvv'); handleFocus("cvc") } }}
                    styles={inputStyle}
                />
            </Group>


        </>
    )
}

export default Payment