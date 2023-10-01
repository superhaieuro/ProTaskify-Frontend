import HeaderTitle from "../../atoms/header-title";
import NormalButton from "../../atoms/normal-button";
import DemoApphehe from "../../demo";

const LecturerClasses = () => {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Classes" subTitle="Manage your classes and semester here." />
                <input type="file" required id="inputList" className="hidden"/>
                <label htmlFor="inputList">
                    <NormalButton
                        icon="upload"
                        message="Import new class"
                        style="border-gray-200 hover:border-gray-400 active:bg-gray-200"
                    />
                </label>
            </div>
            <DemoApphehe />
        </div>
    )
}

export default LecturerClasses;