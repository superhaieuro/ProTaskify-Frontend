import { ChangeEvent, useContext, useState } from "react";
import NormalButton from "../../atoms/normal-button";
import { ToastContext } from "../../../utils/toast-context";
import * as XLSX from "xlsx";
import ModalImportLecturerList from "../../molecules/modal-import-lecturer-list";

const AdminImportLecturerList: React.FC = () => {
    const [invalid, setInvalid] = useState(true); // Kiểm tra định dạng tệp Excel
    const [jsonData, setJsonData] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);


    const toast = useContext(ToastContext); // Cập nhật thông báo lỗi

    // Kiểm tra định dạng Excel
    const isValidExcelFormat = (data: any[]): boolean => {
        const expectedKeys = [ "RollNumber", "MemberCode", "FullName"];
        return data.every(item => expectedKeys.every(key => Object.keys(item).includes(key)));
    }

    // Kiểm tra sự trùng lặp của lecturerId
    const hasDuplicateLecturerId = (data: any[]): boolean => {
        const lecturerId = new Set<string>();
        for (const item of data) {
            if (lecturerId.has(item.RollNumber)) {
                return true; 
            }
            lecturerId.add(item.RollNumber);
        }
        return false; 
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
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
                        if (hasDuplicateLecturerId(data)) {
                            toast?.setErrorMessage("Duplicate Lecturer ID found in the Excel file.");
                        } else {
                            setJsonData(JSON.stringify(data));
                            setShowModal(true);
                            setInvalid(false);
                        }
                    } else {
                        toast?.setErrorMessage("Invalid excel format, please import another one.");
                    }
                }
            }
        }

        if (invalid) {
            e.target.value = "";
        }
    }

    return (
        <>
            <form>
                <input
                    type="file"
                    required
                    id="inputList"
                    hidden
                    onChange={handleFile}
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
                />
                <label htmlFor="inputList">
                    <NormalButton icon="upload" message="Import lecturers" />
                </label>
            </form>

            <ModalImportLecturerList
                isVisible={showModal}
                onClose={() => {
                    setShowModal(false);
                    setInvalid(true);
                }}
                data={jsonData!}
            />
        </>
    );
}

export default AdminImportLecturerList;