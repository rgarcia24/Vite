import React, { useState, useContext } from 'react'
import { Modal, Button, Group } from '@mantine/core'
import Shipping from './Shipping'
import Billing from './Billing'
import Payment from './Payment'
import ProfileName from './ProfileName'
import ProfilesContext from '../../services/ProfilesContext'
import ProfileSchema from '../../pages/profiles/ProfileSchema'
import { buttonStyle, modalStyle } from './styles'
import { handleEmpty } from './handleEmpty'


const ProfileModal = ({ open, setOpen, }) => {


    const [title, setTitle] = useState('Shipping Information')
    const [step, setStep] = useState(1)
    const { profile, setProfile, saveProfile } = useContext(ProfilesContext)
    const [content, setContent] = useState(<Shipping />)
    const setNextStep = () => {
        setStep((prevState) => {
            setContentHandler(prevState + 1)
            return prevState + 1
        })

    }
    const setPrevStep = () => {
        setStep((prevState) => {
            setContentHandler(prevState - 1)
            return prevState - 1
        })

    }

    const setContentHandler = (steps) => {
        switch (steps) {
            case 1: {
                setTitle('Shipping Information')
                setContent(<Shipping />)
                break;
            }
            case 2: {
                setTitle('Billing Information')
                setContent(<Billing />)
                break;
            }
            case 3: {
                setTitle('Payment Information')
                setContent(<Payment />)
                break;
            }
            case 4: {
                setTitle('Name')
                setContent(<ProfileName />)
                break;
            }


        }
    }

    const closeModalHandler = () => {
        setProfile(ProfileSchema)
        setOpen(false)
        setTitle('Shipping Information')
        setContent(<Shipping />)
        setStep(1)
    }

    const handleSave = () => {
        if (handleEmpty(profile)) return
        closeModalHandler()
        saveProfile()
        setProfile(ProfileSchema)
    }

    return (
        <>
            <Modal
                opened={open}
                onClose={closeModalHandler}
                title={title}
                centered
                size="lg"
                styles={modalStyle}>

                {content}
                <Group position="apart" mt="md">
                    <Button styles={buttonStyle} color="violet" onClick={() => { step === 1 ? closeModalHandler() : setPrevStep() }}>
                        {step === 1 ? "Cancel" : "Back"}
                    </Button>
                    <Button styles={buttonStyle} color="violet" onClick={step < 4 ? setNextStep : handleSave}>
                        {step < 4 ? "Next" : "Save"}
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

export default ProfileModal