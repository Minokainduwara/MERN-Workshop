//import { useState } from 'react' // app.jsx eken ain krgna oni count eka wge maninwanm
                                  //UseState  eka use krnna oni use state

interface CardProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function Card({ count, setCount }: CardProps) {

    // const [count, setCount] = useState(0)
  return (
    <>
          <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </>
  )
}
export default Card;