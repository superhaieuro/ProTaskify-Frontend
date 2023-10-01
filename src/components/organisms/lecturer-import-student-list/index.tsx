import { ChangeEvent, useContext, useState } from "react";
import NormalButton from "../../atoms/normal-button"
import { ToastContext } from "../../../utils/my-context";
import * as XLSX from "xlsx";

const LecturerImportStudentList = () => {
    const [jsonData, setJsonData] = useState<string | null>(null);
    const Toast = useContext(ToastContext);

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        const fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            if (fileTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target && e.target.result instanceof ArrayBuffer) {
                        const workbook = XLSX.read(e.target.result, { type: "buffer" });
                        const worksheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[worksheetName];
                        const data = XLSX.utils.sheet_to_json(worksheet);
                        setJsonData(JSON.stringify(data));
                    }
                };
            } else {
                e.target.value = "";
                Toast?.setErrorMessage("Please import excel file types only.");
            }
        }
    };

    return (
        <form>
            <input type="file" required id="inputList" hidden onChange={handleFile} />
            <label htmlFor="inputList">
                <NormalButton
                    icon="upload"
                    message="Import new class"
                    style="border-gray-200 hover:border-gray-400 active:bg-gray-200"
                />
            </label>
        </form>
    )
}

export default LecturerImportStudentList;