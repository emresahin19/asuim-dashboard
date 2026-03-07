import { useEffect, useRef } from 'react';

type IntersectionObserverHookProps = {
    callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver,) => void;
    options?: IntersectionObserverInit;
};

function useIntersectionObserver<T extends HTMLElement>({
    callback,
    options,
}: IntersectionObserverHookProps): {
    observe: (element: T | null) => void;
    unobserve: (element: T | null) => void;
} {
    const observer = useRef<IntersectionObserver | null>(null); 
    const elementsRef = useRef<Set<T>>(new Set()); 

    useEffect(() => {
        observer.current = new IntersectionObserver((entries, observerInstance) => {
            callback(entries, observerInstance);
        }, options);

        elementsRef.current.forEach((element) => {
            if (observer.current) {
                observer.current.observe(element);
            }
        });
        
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [callback, options]);

    
    const observe = (element: T | null) => {
        if (element) {
            elementsRef.current.add(element);
            if (observer.current) {
                observer.current.observe(element);
            }
        }
    };

    const unobserve = (element: T | null) => {
        if (element) {
            elementsRef.current.delete(element);
            if (observer.current) {
                observer.current.unobserve(element);
            }
        }
    };

    return { observe, unobserve };
}

export default useIntersectionObserver;
