import React, { useEffect, useState } from 'react'
import './styles/App.scss'
import { data as text } from './asstets/textData.sv.json'
import clsx from 'clsx'

/*
TODO:
- Timer with wpm
- Change language
*/

const getRandomSentence = () => {
    return text[Math.floor(Math.random() * text.length)]
}

function App() {
    const [currentSentence, setCurrentSentence] = useState(getRandomSentence())
    const [focusChar, setFocusChar] = useState(0)
    const [error, setError] = useState(false)
    const [keyPresses, setKeyPresses] = useState(0)
    const [correctKeyPresses, setCorrectKeyPresses] = useState(0)

    const handleResetAll = () => {
        setCurrentSentence(getRandomSentence())
        setFocusChar(0)
        setKeyPresses(0)
        setCorrectKeyPresses(0)
    }

    useEffect(() => {
        const handleKeyPressed = (e: KeyboardEvent) => {
            console.log(e)
            if (
                e.code === 'Tab' ||
                e.code === 'Escape' ||
                e.code === 'CapsLock' ||
                e.key === 'Shift'
            )
                return

            setKeyPresses((current) => current + 1)

            if (e.code === 'Space') e.preventDefault()
            if (focusChar === currentSentence.length - 1) {
                return handleResetAll()
            }
            if (e.key === currentSentence[focusChar]) {
                setError(false)
                setCorrectKeyPresses((current) => current + 1)
                return setFocusChar((current) => current + 1)
            }
            setError(true)
        }

        document.addEventListener('keydown', handleKeyPressed)
        return () => document.removeEventListener('keydown', handleKeyPressed)
    }, [focusChar])

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {}
    return (
        <div className='App'>
            <div className='text-wrapper'>
                {Array.prototype.map.call(currentSentence, (char, idx) => (
                    <Character
                        key={idx}
                        value={char}
                        done={idx < focusChar}
                        hasFocus={idx === focusChar}
                        error={error}
                    />
                ))}
            </div>
            <div className='statistics'>
                {keyPresses > 0
                    ? Math.round((100 * correctKeyPresses) / keyPresses)
                    : 100}
                %
            </div>
        </div>
    )
}

interface CharacterType {
    value: string
    hasFocus: boolean
    done: boolean
    error: boolean
}

const Character: React.FC<CharacterType> = ({
    value,
    hasFocus,
    done,
    error,
}) => {
    return (
        <div
            className={clsx(
                'character',
                done && 'done',
                hasFocus && 'focus',
                hasFocus && error && 'error'
            )}
        >
            {value}
        </div>
    )
}

export default App
