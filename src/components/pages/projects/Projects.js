import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Projects.module.css';

import Message from '../../layout/message/Message';
import LinkButton from '../../layout/linkButton/LinkButton';
import Container from '../../layout/container/Container';
import Card from '../../layout/card/Card';
import Loading from '../../layout/loading/Loading';

function Projects(){

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);


    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    useEffect(()=>{
        setTimeout(()=>{
            fetch('http://localhost:5000/projects',{
                method:'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }).then((resp)=> resp.json()).then((data)=>{
                setProjects(data);
                setRemoveLoading(true);            
            }).catch((err)=> console.log(err));
        }, 500)
    },[])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos Cadastrados</h1>
                <LinkButton to='/newproject' text='Criar Projeto'></LinkButton>
            </div>
            <div>
                {message && <Message type="success" msg={message} />}
                <Container customClass="start">
                    {projects.length > 0 &&
                        projects.map((project)=>
                            <Card 
                                name={project.name}
                                id={project.id}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id} />
                    )}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não projetos cadastrados</p>
                    )}
                </Container>
            </div>
            
            
            
        </div>
    )
}

export default Projects;