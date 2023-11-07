import Logo from "../../../assets/logo.svg"

const MenuLogo = () => {
    return (
        <div className="px-3 w-fit flex items-end gap-2.5">
            <img className="h-10" src={Logo}></img>
            <div>
                <div className="text-xl text-blue-600 font-bold">ProTaskify</div>
                <div className="text-xs text-gray-600">Workplace</div>
            </div>
        </div>
    )
}

export default MenuLogo;