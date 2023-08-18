import { DependencyList, EffectCallback, useEffect, useRef, useState } from "react";

export default function useMountEffect(effect: EffectCallback, deps: DependencyList) {
	const isMountedRef = useRef(false);

	useEffect(() => {
		if (!isMountedRef.current) {
			isMountedRef.current = true;
		} else {
			return effect();
		}
	}, deps);
}
