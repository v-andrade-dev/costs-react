import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { parse, v4 as uuidv4} from 'uuid';

import styles from './Project.module.css';

import Loading from '../../../layout/loading/Loading';
import Container from '../../../layout/container/Container';
import ProjectForm from '../projectForm/ProjectForm';
import Message from '../../../layout/message/Message';
import ServiceForm from '../projectService/ServiceForm';


function Project(){

    const { id } = useParams();
    const[project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState(); 
    const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(()=> {
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                },
            }).then((resp)=> resp.json()).then((data)=>{
                setProject(data);
            }).catch((err)=> console.log(err))
        }, 500)
    }, [id])


    function editPost(project){
        setMessage("");
        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser inferior ao custo!");
            setType("error")
            return false;
        }
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(project),

        }).then((resp)=> resp.json().then((data)=> {
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto atualizado!");
            setType("success")

        })).catch((err)=> console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    function createService(project){
        setMessage("");

        const lastService = project.services[project.services.length-1];
        lastService.id = uuidv4();
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado!");
            setType("error");
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(project),

        }).then((resp)=> resp.json().then((data)=> {
            console.log(data);
            setMessage("Projeto atualizado!");
            setType("success");

        })).catch((err)=> console.log(err))
    }

    return (
        <>
            {project.name ? ( 
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Orçamento utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        handleSubmit={editPost}
                                        btnText="Salvar" 
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicionar serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço"  : "Fechar"}    
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}/>
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                            <Container customClass="start">
                                <p>Itens de serviço</p>
                            </Container>
                    </Container>
                </div>
            ) : ( <Loading /> )}
        </>
    )
}

export default Project;