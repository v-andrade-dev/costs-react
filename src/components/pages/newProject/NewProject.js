import styles from './NewProject.module.css';

import ProjectForm from '../../layout/project/ProjectForm';

function NewProject(){
    return (
        <div className={styles.newproject_container}>
            <h1>Novo Projeto</h1>
            <p>Crie seu projeto e adicione serviços</p>
            <ProjectForm btnText="Criar projeto"/>

        </div>
    )
}

export default NewProject;