'use client'
import * as React from "react";
import InteractionGraph from "./InteractionGraph";
import { CharacterInteractions } from "../types/model";
import { analyzeBook, fetchTaskStatus, updateBookId } from "../utils/utils";

const BookAnalyzer: React.FunctionComponent = () => {
  const [bookId, setBookId] = React.useState<number>()
  const [taskId, setTaskId] = React.useState('')
  const [status, setStatus] = React.useState('');
  const [isMocked, setIsMocked] = React.useState(false)
  const [result, setResult] = React.useState<CharacterInteractions | undefined>(undefined);

  React.useEffect(() => fetchTaskStatus(taskId, setStatus, setResult), [taskId]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="p-4 flex gap-4 items-center justify-center">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className='input input-primary'
          placeholder='Enter Book ID'
          value={bookId}
          onChange={({ target: { value } }) => updateBookId(value, setBookId)} />

        
        <button
          disabled={status === "in_progress"}
          className='btn btn-primary'
          onClick={() => analyzeBook(bookId, isMocked, setTaskId, setStatus)}
        >
          Analyze
        </button>
        <label className="label">
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              checked={isMocked}
              onChange={({ target: { checked } }) => setIsMocked(checked)}/>
            Mock LLM Response
          </label>
      </div>

      <div className="p-4 gap-4 items-center content-center">
        {status == 'error'  && (
          <p className="text-red-600 text-center">Could not fetch analysis</p>
        )}
        {status == 'in_progress'  && (
          <div className="flex flex-col items-center justify-center mt-4 space-y-2">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-white font-medium mt-2">  Analyzing book... Please wait. It can take upto 5 minutes. Consider using mocked response for testing.</p>
          </div>
        )}
        {status === 'done' && result && (
          <div className="p-4">
            <InteractionGraph data={result} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BookAnalyzer
