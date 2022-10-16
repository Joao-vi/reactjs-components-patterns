/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import { createContext, ReactNode, RefObject, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import mojs from "@mojs/core";
import useSound from "use-sound";

import { ClapIcon } from "../components/clap-icon";

type TMediumClapContext = {
    totalCountEl: RefObject<HTMLSpanElement>
    clapCountEl: RefObject<HTMLSpanElement>
} & typeof INITIAL_STATE

interface IMediumClap {
    onClap(count: number): void
    children: ReactNode
}

const plopSound = '/sounds/plop.mp3'
const DURATION = 300;
const MAX_CLICKS = 30;

const INITIAL_STATE = {
    count: 0,
    totalCount: 236,
    isClicked: false,
    playbackRate: 0.7,
};


const MediumClapContext = createContext<TMediumClapContext | undefined>(undefined)

const MediumClap = ({ children, onClap }: IMediumClap) => {
    const isFirstMount = useRef(true)
    const { clapState, handleMouseDown, handleMouseUp, handleSetClapState } = useClapState()
    const { count } = clapState
    const { animate, btnEl, burstAnimate, clapCountEl, totalCountEl } = useClapAnimation()

    const [play] = useSound(plopSound, {
        playbackRate: clapState.playbackRate,
        interrupt: true,
    });

    const value = useMemo(() => ({ ...clapState, clapCountEl, totalCountEl }), [clapState, clapCountEl, totalCountEl])

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;

            return
        }

        onClap(count)

        if (clapState.count === MAX_CLICKS) {
            play({ playbackRate: 1 });
            burstAnimate.current!.replay();
            btnEl.current?.classList.add("apply-hover");
        } else {
            animate.current.replay()
            play()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return (
        <MediumClapContext.Provider value={value}>

            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleSetClapState}
                ref={btnEl}
                className="relative w-[120px] h-[120px] flex justify-center items-center border border-light-text rounded-full hover-effect"
            >
                <ClapIcon
                    className={`w-[70px] stroke-primary ${clapState.isClicked ? "fill-primary" : "fill-[none]"}`}
                />
                {children}
            </button>

        </MediumClapContext.Provider>
    );
};



// ========================
// >> Sub Components <<
// ========================

const TotalCount = () => {
    const { totalCountEl, totalCount } = useMediumClapContext()

    return (
        <span
            ref={totalCountEl}
            className="absolute top-[-30px] text-light-text"
        >
            {totalCount}
        </span>
    )
}

const ClapCount = () => {
    const { clapCountEl, count } = useMediumClapContext()

    return (
        <span
            ref={clapCountEl}
            className="pointer-events-none aspect-square min-h-[40px] min-w-[40px] p-2 rounded-full bg-primary absolute top-[-60px] flex items-center justify-center text-zinc-800 font-bold"
        >
            +{count}
        </span>
    )
}

// ========================


// ========================
// >> Hook <<function
// ========================

const useMediumClapContext = () => {
    const ctx = useContext(MediumClapContext)

    if (!ctx) throw new Error('MediumClapContext.Provider was not found.')

    return ctx
}

const useClapAnimation = () => {
    const animate = useRef<any>(null);
    const btnEl = useRef<HTMLButtonElement>(null);
    const clapCountEl = useRef<HTMLSpanElement>(null);
    const totalCountEl = useRef<HTMLSpanElement>(null);
    const burstAnimate = useRef<any>(null);

    useEffect(() => {
        animate.current = new mojs.Timeline();

        const btnAnimation = new mojs.Html({
            el: btnEl.current,
            duration: DURATION,
            easing: mojs.easing.out,
            scale: { 1.2: 1 },
        });
        btnEl.current!.style.transform = "scale(1)";

        const clapCountAnimation = new mojs.Html({
            el: clapCountEl.current,
            duration: DURATION,
            easing: mojs.easing.ease.out,
            y: { 0: -40 },
            opacity: { 0: 1 },
        }).then({
            delay: DURATION,
            duration: DURATION * 0.8,
            easing: mojs.easing.ease.out,
            opacity: { 1: 0 },
            y: -70,
        });

        const totalCountAnimation = new mojs.Html({
            el: totalCountEl.current,
            duration: DURATION,
            delay: DURATION * 1.2,
            easing: mojs.easing.ease.out,
            opacity: { 0: 1 },
            y: { 5: 0 },
        });

        burstAnimate.current = new mojs.Burst({
            parent: btnEl.current,
            radius: { 60: 130 },
            children: {
                fill: "#fbd38d",
                pathScale: { 0.5: 1 },
            },
        });

        animate.current!.add([
            totalCountAnimation,
            btnAnimation,
            clapCountAnimation,
        ]);
    }, []);

    return {
        animate, btnEl, clapCountEl, totalCountEl, burstAnimate
    }
}

const useClapState = () => {
    const intervalRef = useRef<NodeJS.Timer>();
    const timeoutRef = useRef<NodeJS.Timeout>();

    const [clapState, setClapState] = useState(INITIAL_STATE);

    const handleSetClapState = () => {
        setClapState((state) => {
            if (state.count >= MAX_CLICKS) return state;

            return ({
                count: state.count + 1,
                totalCount: state.totalCount + 1,
                isClicked: true,
                playbackRate: state.playbackRate + 0.1,
            });
        });
    };

    const handleMouseDown = () => {
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(handleSetClapState, 100);
        }, 500);
    };

    const handleMouseUp = () => {
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);
    };

    return {
        clapState, handleMouseDown, handleMouseUp, handleSetClapState
    }
}

// ========================



export default () => {
    function Usage() {
        const [total, seTotal] = useState(0)

        return (
            <>
                <MediumClap onClap={(value) => seTotal(value)}>
                    <TotalCount />
                    <ClapCount />
                </MediumClap>

                {!!total &&
                    <span
                        className="italic text-light-text"
                    >
                        {`You've clicked ${total} times.`}
                    </span>
                }
            </>
        )
    }
    return <Usage />
}

