import { useEffect } from "react";
import { Box, Grid, TextField,Typography, styled, MenuItem, Button } from "@mui/material";
import { useForm, Form } from "../../../components/useForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from 'axios'
import { mode } from "../../../data";
import { useState } from 'react';
import studentId from "../[studentId]";




const comName = '';

const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))

const initialValues = {
    cName: "",
    mode: "",
    
}

const classes = {
    root:{
        padding: "1rem"
    }
}

export default function modify(){



    const router = useRouter();

    const [name, setName] = useState('');
    const [regNo, setregNo] = useState('');
    const [dept, SetDept] = useState('');
    const [companies, setCompanies] = useState([]);

    const {data: session, status} = useSession();
    

    useEffect(()=>{
        if(status === "unauthenticated") router.replace("/");
    },[])

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const validate = () => {
        let temp = {}
        temp.cName = (/^[A-Za-z\s]+$/).test(values.cname) ? "" : "ENTER VALID COMPANY NAME"
        temp.mode =  (values.mode).length > 0 ? "" : "Select mode"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    async function handleSubmit(){
        if(validate()){
        
            let cName = values.cName;
            let mode = values.mode;
            console.log(regNo);
            
            
            if (studentId.regNo = regNo) {
                console.log(studentId.regNo);

                const {data} = await axios.put("/api/student"+`${regNo}`,{cName,mode});
                console.log(data);
                if (data.cName = /^[A-Za-z\s]+$/) {
                    window.alert('Company details added successfully');
                }
            }
        }
    }

    /*const {data} = await axios.post("/api/student",{cName,mode})
            console.log(data)
            if (data.cName = /^[A-Za-z\s]+$/) {
                window.alert('Company details added successfully');
            }*/

    /*const StudentIndividual = asyncHandler(async (req, res) => {
        const [{ studentName, studentRegNo, studentDept, studentCompanies, studentCmode }] =
            req.body;
    
        const studentFound = await Student.findById(req.params.id);
    
        if (studentFound) {
                (studentFound.studentName = studentName),
                (studentFound.studentRegNo = studentRegNo),
                (studentFound.StudentDept = studentDept),
                (studentFound.StudentCompanies = studentCompanies),
                (studentFound.studentCmode = studentCmode)
    
            const updatedStudent = await questionStudent.save();
    
            res.status(204).json({ message: "Student Updated Successfully" });
    
    
        } else {
            res.status(404);
            throw new Error('Student not found');
        }
    })*/

    return <Box sx={{...classes.root}}>
        <Typography variant="h6">Companies Entry</Typography>
        <Form>
            <Grid container sx={{display: "flex", justifyContent: "center"}}>
                <Grid item>
                    <Item>
                        <TextField
                                variant='filled'
                                label="Company Name"
                                name="cName"
                                size="small"
                                value={values.cName}
                                onChange={handleInputChange}
                                {...(errors ? { error: (errors.cName? true : false), helperText: errors.cName } : false)}
                        />
                        <TextField
                            select
                            name="mode"
                            size="small"
                            variant='filled'
                            label='Select mode'
                            value={values.mode}
                            onChange={handleInputChange}
                        >
                            {mode.map((e) => (
                                <MenuItem key={e.id} value={e.value}>
                                    {e.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <Button 
                            type="button"
                            variant="contained"
                            size="small"
                            sx={{padding: "0", margin: "1rem 0"}}
                            onClick={handleSubmit}
                        >ADD
                        </Button>
                        <ul>{companies.map
                        (companies => (
                        <li key={companies.cName}>{companies.mode}
                        </li>))}
                        </ul>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    </Box>

}