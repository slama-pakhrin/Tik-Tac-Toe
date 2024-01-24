import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}){
    
    const [editingName, setEditingName] = useState(initialName);
    const [editing, isEditing] = useState(false);

    const handleEditClick = () => {
        isEditing((edit) => !edit);
        if(isEditing){
            onNameChange(symbol, editingName)
        }
    }

    const handleNameChange = (event) => {
        setEditingName(event.target.value);
    }
    
    let playerName = <span className="player-name">{editingName}</span>

    if(editing){
        playerName = <input type="text" required value={editingName} onChange={handleNameChange}/>
    }
    
    return(
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{editing ? 'Save' : 'Edit'}</button>
           
        </li>
    )
};  