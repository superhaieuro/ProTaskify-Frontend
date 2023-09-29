import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import api from "../../config/axios";
const API_URL = "http://localhost:8080";

function DemoApphehe(): JSX.Element {
    const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [jsonData, setJsonData] = useState<string | null>(null);

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        const fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            if (fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target && e.target.result instanceof ArrayBuffer) {
                        setExcelFile(e.target.result);
                    }
                };
            } else {
                setTypeError("Please select only excel file types");
                setExcelFile(null);
            }
        }
    };

    const handleFileSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            // Convert the data to JSON format
            const jsonData = JSON.stringify(data);
            setJsonData(jsonData);
            //   console.log(jsonData);
            //   try {
            //     const request = await axios.post(
            //       `${API_URL}/lecturer/import-student`,
            //       jsonData,
            //       {
            //         headers: {
            //           "Content-Type": "application/json",
            //         },
            //       }
            //     );
            //     console.log(request.data);
            //     if (request.status === 200) {
            //       console.log("Data sent successfully");
            //     } else {
            //       console.error("Failed to send data");
            //     }
            //   } catch (error) {
            //     console.error("Error sending data:", error);
            //   }

        }
    };

    useEffect(() => {
        if (jsonData) {
            try {
                // const fetchUserData = async () => {
                //     const response = await api.post("/api/v1/lecturer/import-student", jsonData);
                //     if (response.status === 200) {
                //         console.log("Data sent successfully");
                //     } else {
                //         console.error("Failed to send data");
                //     }
                // }
                // fetchUserData();
                
                const fetchUserData = async () => {
                    const response = await api.post("/api/v1/lecturer/import", jsonData);
                    if (response.status === 200) {
                        console.log(response);
                    } else {
                        console.error("Failed to send data");
                    }
                }
                fetchUserData();
            } catch (error) {
                console.log(error);
                
            }
            
        }
    }, [jsonData]);

    return (
        <div className="wrapper">
            <h3>Upload & View Excel Sheets</h3>
            <form className="custom-form" onSubmit={handleFileSubmit}>
                <input type="file" required onChange={handleFile} />
                <button type="submit" className="btn">
                    UPLOAD
                </button>
                {typeError && <div>{typeError}</div>}
            </form>
        </div>
    );
}

export default DemoApphehe;