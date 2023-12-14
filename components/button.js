import { useState } from "react";
import styles from "./styles.module.css"
import { ref } from "firebase/database"
import { db } from "../firebaseConfig";

export default function SeuComponente() {
    const [buttonText, setButtonText] = useState('Tenho interesse');
    const [buttonDisabled, setButtonDisabled] = useState(false);
  
    const handleButtonClick = async () => {
      const counterRef = db.ref('contador');

      try {
        await db.ref().update({
          contador: (await counterRef.once('value')).val() + 1,
        });
  
        setButtonText('Obrigado pelo seu apoio!');
        setButtonDisabled(true);
      } catch (error) {
        console.error('Erro ao incrementar o contador:', error);
      }
    };
  
    return (
      <button
        className={styles.button}
        onClick={handleButtonClick}
        style={{ backgroundColor: buttonDisabled ? "green" : '"#0066A2"', 
                color: buttonDisabled ? "black" : "black"
            }}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    );
}

