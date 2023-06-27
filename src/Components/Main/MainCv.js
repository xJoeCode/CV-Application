import { motion } from "framer-motion";
import BasicInfo from "../CV/BasicInfo";
import EducationInfo from "../CV/EducationInfo";
import WorkInfo from "../CV/WorkInfo";
import { useForms } from "../Context/formContext";
import { useCallback, useEffect, memo } from "react";
import useDbStatusState from "../../hooks/useDbStatusState";
import { useAccount } from "../Context/accountContext";

function MainCv({ setShowEditButtons, setExpandedState, setCvDisplay,cvDisplay, ...props }) {
    const [formStates, dispatchForms] = useForms();
    const {setDbStatus} = useDbStatusState({formStates})
    const {acc, setAcc, db} = useAccount()



    console.log(formStates);

    useEffect(() => {

        if (formStates) {
            let formstatesCopy = { ...formStates };
            formstatesCopy.formType = "nil";
            window.localStorage.setItem("formStates", JSON.stringify(formstatesCopy));
        }

        if (cvDisplay){
            window.localStorage.setItem("cvDisplay", JSON.stringify(cvDisplay))
        }

    }, [formStates,cvDisplay,dispatchForms]);

    const basicInfoHandler = useCallback(
        (data) => {
            setShowEditButtons(false);
            setExpandedState("swap");
            data !== "displayBasicInfoForm" && setCvDisplay("swap");
            dispatchForms({ formType: data, type: "setDisplay" });
        },
        [setCvDisplay, setExpandedState, setShowEditButtons, dispatchForms]
    );

    const editInfoHandler = (formId, type) => {
        setExpandedState("swap");
        setCvDisplay("swap");
        setShowEditButtons("swap");

        if (type === "education") {
            dispatchForms({ formType: "editEducationInfoForm", type: "setDisplay" });
            const schoolData = formStates.data?.some((entry) => entry.id === formId) && formStates.data.filter((entry) => entry.id === formId);
            console.log(schoolData);
            const { id } = schoolData[0];
            console.log(id);
            props.setformId(id);
        }

        if (type === "work") {
            dispatchForms({ formType: "editWorkHistoryForm", type: "setDisplay" });
            const workData =
                formStates.data?.some((entry) => entry.id === formId) && formStates.data.filter((entry) => entry.id === formId);
            const { id } = workData[0];
            props.setformId(id);
        }
    };

    const deleteInfoHandler = (id, type) => {
        if (type === "education") {
            dispatchForms({ type: "deleteEducationInfo", formData: id });
            setShowEditButtons("swap");
            setDbStatus('mutate')
        }
        if (type === "work") {
            dispatchForms({ type: "deleteWorkInfo", formData: id });
            setShowEditButtons("swap");
            setDbStatus('mutate')
        }
    };

    const parentAnimation = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.3, delay: 0.3 } },
    };

    const childAnimation = {
        hidden: { opacity: 0, translateY: 0 },
        show: { opacity: 1, translateY: -15.25 },
        transition: { delay: -0.25 },
    };

    const basicInfoData = formStates.data?.some((entry) => entry.name) && formStates.data?.filter((entry) => entry.name);
    const schoolData = formStates.data?.some((entry) => entry.schoolName) && formStates.data.filter((entry) => entry.schoolName);
    const workInfoData = formStates.data?.some((entry) => entry.jobTitle) && formStates.data.filter((entry) => entry.jobTitle);

    return (
        <>
            {
                <BasicInfo
                    onClick={useCallback(() => basicInfoHandler("editBasicInfoForm"), [basicInfoHandler])}
                    showButtons={props.showEditButtons}
                    {...basicInfoData[0]}
                ></BasicInfo>
            }
            <motion.div variants={parentAnimation} initial="hidden" animate="show" className="col-span-3 flex flex-col h-full p-3">
                
                {formStates.cvIncludes.includes("EducationInfo") && (
                    <motion.h1 variants={childAnimation} className="font-serif text-ultraDarkBlue mt-2 border-b-2 text-3xl">
                        Education
                    </motion.h1>
                )}
                {formStates.cvIncludes.includes("EducationInfo") &&
                    schoolData.map((data) => (
                        <EducationInfo
                            animation={childAnimation}
                            key={data.id}
                            handleDelete={deleteInfoHandler}
                            handleEdit={editInfoHandler}
                            showButtons={props.showEditButtons}
                            {...data}
                        ></EducationInfo>
                    ))}
                {formStates.cvIncludes.includes("WorkInfo") && (
                    <motion.h1 variants={childAnimation} className="font-serif text-ultraDarkBlue mt-2 border-b-2 text-3xl">
                        Work
                    </motion.h1>
                )}
                {formStates.cvIncludes.includes("WorkInfo") &&
                    workInfoData.map((data) => (
                        <WorkInfo
                            animation={childAnimation}
                            key={data.id}
                            handleEdit={editInfoHandler}
                            handleDelete={deleteInfoHandler}
                            {...data}
                            showButtons={props.showEditButtons}
                        ></WorkInfo>
                    ))}
            </motion.div>
        </>
    );
}

MainCv = memo(MainCv);

export default MainCv;
