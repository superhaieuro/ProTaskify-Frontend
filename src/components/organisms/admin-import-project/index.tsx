import React, { ChangeEvent, useContext, useState, useEffect } from "react";
import NormalButton from "../../atoms/normal-button";
import { ToastContext } from "../../../utils/toast-context";
import * as XLSX from "xlsx";
import ModalImportProjectList from "../../molecules/modal-import-project-list";

const AdminImportProjectList: React.FC = () => {
    const [invalid, setInvalid] = useState(true);
    const [jsonData, setJsonData] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const toast = useContext(ToastContext);

    const isValidExcelFormat = (data: any[]): boolean => {
        // Define the expected keys in the Excel file
        const expectedKeys = [
            "Subject name",
            "Problems",
            "Context",
            "Actors",
            "Functional requirements",
            "Non-Functional requirements"
        ];

        // Check if all expected keys exist in the data
        return data.every(item => {
            // eslint-disable-next-line no-prototype-builtins
            return expectedKeys.some(key => item.hasOwnProperty(key));
        });
    };

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
                        setJsonData(JSON.stringify(data));
                        setShowModal(true);
                        setInvalid(false);
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

    useEffect(() => {
        // Log jsonData whenever it changes
        console.log("jsonData changed:", jsonData);
    }, [jsonData]);

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
                    <NormalButton icon="upload" message="Import projects" />
                </label>
            </form>

            <ModalImportProjectList
                isVisible={showModal}
                onClose={() => {
                    setShowModal(false);
                    setInvalid(true);
                }}
                data={jsonData!}
            />
        </>
    );
};

export default AdminImportProjectList;
