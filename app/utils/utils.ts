import { error } from "console";
import { AnalyzeResponse, CharacterInteractions, TaskStatus, TaskStatusResponse } from "../types/model";

export const analyzeBook = async (bookId: number | undefined, setTaskId: (task: string) => void, setStatus: (status: TaskStatus) => void): Promise<void> => {

    if (!bookId) {
        return;
    }

    try {
        setStatus("in_progress")
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_id: bookId }),
        });

        if (!response.ok) {
            throw new Error(`Failed to start analysis: ${response.statusText}`);
        }

        const data: AnalyzeResponse = await response.json();
        setTaskId(data.task_id);
    } catch (error) {
        console.error('Error analyzing book:', error);
        setStatus("error");
    }
};


export const fetchTaskStatus = (taskId: string, setStatus: (status: TaskStatus) => void, setResult: (result: CharacterInteractions) => void) => {
    if (!taskId) return;

    const interval = setInterval(async () => {
        try {
            setStatus("in_progress")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/status/${taskId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch status');
            }

            const data: TaskStatusResponse = await response.json();
            setStatus(data.status);

            if (data.status === 'done') {
                setResult(data.result);
                clearInterval(interval);
            }

            if (data.status === 'error') {
                clearInterval(interval);
            }
        } catch (error) {
            console.error('Error fetching status:', error);
            setStatus("error");
            clearInterval(interval);
        }
    }, 2000);

    return () => clearInterval(interval);
}

export const updateBookId = (value: string, setBookId: (bookId: number) => void) => {
    const parsedId = parseInt(value)
    if (!Number.isNaN(parsedId)) {
        setBookId(parsedId)
    }
}