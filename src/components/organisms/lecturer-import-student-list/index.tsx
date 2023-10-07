import { ChangeEvent, useContext, useState } from "react";
import NormalButton from "../../atoms/normal-button"
import { ToastContext } from "../../../utils/toast-context";
import * as XLSX from "xlsx";
import ModalImportStudentList from "../../molecules/modal-import-student-list";
import api from "../../../config/axios";

const LecturerImportStudentList = () => {
    const [invalid, setInvalid] = useState(true); //Check the format of Excel file
    const [jsonData, setJsonData] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [className, setclassName] = useState<string | null>(null);
    const [semester, setSemester] = useState<string | null>(null);

    const toast = useContext(ToastContext); //Update toast for notification

    //Valid the excel fileds
    const isValidExcelFormat = (data: any[]): boolean => {
        const expectedKeys = ["Class", "RollNumber", "MemberCode", "FullName"];
        return data.every(item => expectedKeys.every(key => Object.keys(item).includes(key)));
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        //Get active Semester
        const fetchUserData = async () => {
            try {
                const response = await api.get("/api/v1/common/get-active-semester");
                if (response.status === 200) {
                    if (response.data !== "") {
                        setSemester(JSON.stringify(response.data));
                        const selectedFile = e.target.files && e.target.files[0];
                        if (selectedFile) {
                            const reader = new FileReader();
                            reader.readAsArrayBuffer(selectedFile);
                            reader.onload = (e: ProgressEvent<FileReader>) => {
                                if (e.target && e.target.result instanceof ArrayBuffer) {
                                    const workbook = XLSX.read(e.target.result, { type: "buffer" });
                                    const worksheetName = workbook.SheetNames[0];
                                    const worksheet = workbook.Sheets[worksheetName];
                                    const data = XLSX.utils.sheet_to_json(worksheet);
                                    if (isValidExcelFormat(data)) {
                                        setJsonData(JSON.stringify(data));
                                        setclassName(JSON.parse(JSON.stringify(data))[0].Class);
                                        setShowModal(true);
                                        setInvalid(false);
                                    } else {
                                        toast?.setErrorMessage("Inalid excel format, please import another one.");
                                    }
                                }
                            }
                        }

                        if (invalid) {
                            e.target.value = "";
                        }
                    } else {
                        toast?.setErrorMessage("No semester is ongoing now.");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserData();
    }

    return (
        <>
            <form>
                <input type="file" required id="inputList" hidden onChange={handleFile}
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv" />
                <label htmlFor="inputList">
                    <NormalButton
                        icon="upload"
                        message="Import new class" />
                </label>
            </form>

            <ModalImportStudentList
                isVisible={showModal}
                onClose={() => {
                    setShowModal(false);
                    setInvalid(true);
                }}
                className={className!}
                semeter={semester!}
                data={jsonData!} />
        </>
    )
}

export default LecturerImportStudentList;