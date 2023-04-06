import { toast, Zoom } from 'react-toastify'

class Notify {
    constructor() {
        this.config = {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Zoom,
        }
        this.toast = toast
    }

    success(message) {
        this.toast.dark(message, this.config)
    }
    error(message) {
        this.toast.error(message, this.config)
    }
}

export default Notify