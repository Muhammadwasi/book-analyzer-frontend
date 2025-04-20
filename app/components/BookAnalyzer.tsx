'use client'
import * as React from "react";
import InteractionGraph from "./InteractionGraph";
import { CharacterInteractions } from "../types/model";
import { analyzeBook, fetchTaskStatus, updateBookId } from "../utils/utils";

const BookAnalyzer: React.FunctionComponent = () => {
  const [bookId, setBookId] = React.useState<number>(123)
  const [taskId, setTaskId] = React.useState('')
  const [status, setStatus] = React.useState('');
  const [result, setResult] = React.useState<CharacterInteractions | undefined>(undefined);

  React.useEffect(() => fetchTaskStatus(taskId, setStatus, setResult), [taskId]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="p-4 flex gap-4 items-center justify-center">
        <input
          type='text'
          className='input input-primary'
          placeholder='Enter Book ID'
          value={bookId}
          onChange={({ target: { value } }) => updateBookId(value, setBookId)} />

        <button
          disabled={status === "in_progress"}
          className='btn btn-primary'
          onClick={() => analyzeBook(bookId, setTaskId, setStatus)}
        >
          Analyze
        </button>
      </div>

      <div className="p-4 gap-4 items-center content-center">
        {status == 'error'  && (
          <p className="text-red-600 text-center">Could not fetch analysis</p>
        )}
        {status == 'in_progress'  && (
          <p className="text-yellow-600 text-center">Analysis is in progress...</p>
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
