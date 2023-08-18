import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useIsClient from "@/hooks/useIsClient";
import useMountEffect from "@/hooks/useMountEffect";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "@/components/ui/button";
import { Cross1Icon, HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const APP_THEME_KEY = "app/theme";
export enum AppTheme {
	Light = "light",
	Dark = "dark",
}

export default function AppHeader({
	links,
}: {
	links: {
		[key: string]: {
			name: string;
			path: string;
		};
	};
}) {
	const [path, setPath] = useState(globalThis.location?.pathname ?? "/");

	useEffect(() => {
		const handler = () => {
			setPath(globalThis.location.pathname);
		};

		globalThis.addEventListener("popstate", handler);

		return () => {
			globalThis.removeEventListener("popstate", handler);
		};
	}, []);

	const storage = useLocalStorage();

	const [theme, setTheme] = useState<AppTheme>(() => {
		const saved = storage.get(APP_THEME_KEY);

		if (saved !== null) {
			return saved;
		}

		return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? AppTheme.Dark : AppTheme.Light;
	});

	useMountEffect(() => {
		const icon = document.querySelector(`link[rel="icon"]`);

		if (theme === AppTheme.Light) {
			document.body.classList.remove("dark");

			if (icon) {
				(icon as HTMLLinkElement).href = "/nix-dark.svg";
			}
		} else {
			document.body.classList.add("dark");

			if (icon) {
				(icon as HTMLLinkElement).href = "/nix-light.svg";
			}
		}
	}, [theme]);

	const toggleTheme = () => {
		const next = theme === AppTheme.Light ? AppTheme.Dark : AppTheme.Light;

		setTheme(next);
		storage.set(APP_THEME_KEY, next);
	};

	const isClient = useIsClient();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((state) => !state);
	};

	let nixIcon = null;

	if (isClient) {
		const name = theme === AppTheme.Light ? "nix-dark.svg" : "nix-light.svg";

		nixIcon = <img className="w-6 h-6" src={`${import.meta.env.BASE_URL}${name}`} />;
	}

	return (
		<>
			<div className="sticky top-0 h-14 z-40 bg-background flex items-center justify-between py-2 px-4 border-b border-b-secondary">
				<div className="w-6 h-6">{nixIcon}</div>
				<div className="flex gap-1 items-center phone:hidden">
					<NavigationMenu>
						<NavigationMenuList className="gap-1">
							<NavigationMenuItem>
								<NavigationMenuLink
									href={import.meta.env.BASE_URL}
									className={cn(
										navigationMenuTriggerStyle(),
										path === "/" ? "font-bold" : "",
										"items-center px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
									)}
								>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							{links.lib ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.lib.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.lib.path ? "font-bold" : "",
											"items-center px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.lib.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{links.options ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.options.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.options.path ? "font-bold" : "",
											"items-center px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.options.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{false && links.apps ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.apps.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.apps.path ? "font-bold" : "",
											"items-center px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.apps.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{links.packages ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.packages.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.packages.path ? "font-bold" : "",
											"items-center px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.packages.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{links.shells ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.shells.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.shells.path ? "font-bold" : "",
											"items-center px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.shells.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div>
					{isClient ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={toggleTheme}
										className="bg-transparent text-foreground shadow-none hover:bg-primary hover:text-primary-foreground"
									>
										{theme === "light" ? <SunIcon /> : <MoonIcon />}
									</Button>
								</TooltipTrigger>
								<TooltipContent>Toggle Theme</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : null}
				</div>
			</div>
			<div className="hidden phone:block z-40">
				<div
					className={cn(
						"fixed z-30 top-full w-full left-0 right-0 max-h-[60vh] p-4 pb-24 overflow-y-auto transition-transform transform bg-background border border-t-8 border-t-foreground",
						isMenuOpen && "translate-y-[-100%]"
					)}
				>
					<NavigationMenu orientation="vertical" className="max-w-full ">
						<ul className="flex flex-col w-full gap-2">
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									href={import.meta.env.BASE_URL}
									className={cn(
										navigationMenuTriggerStyle(),
										path === "/" ? "font-bold bg-muted" : "",
										"w-full justify-start text-md items-center px-4 py-6 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
									)}
								>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							{links.lib ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.lib.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.lib.path ? "font-bold bg-muted" : "",
											"w-full justify-start text-md items-center px-4 py-6 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.lib.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{links.options ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.options.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.options.path ? "font-bold bg-muted" : "",
											"w-full justify-start text-md items-center px-4 py-6 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.options.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{false && links.apps ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.apps.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.apps.path ? "font-bold bg-muted" : "",
											"w-full justify-start text-md items-center px-4 py-6 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.apps.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{links.packages ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.packages.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.packages.path ? "font-bold bg-muted" : "",
											"w-full justify-start text-md items-center px-4 py-6 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.packages.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
							{links.shells ? (
								<NavigationMenuItem>
									<NavigationMenuLink
										href={links.shells.path}
										className={cn(
											navigationMenuTriggerStyle(),
											path === links.shells.path ? "font-bold bg-muted" : "",
											"w-full justify-start text-md items-center px-4 py-6 rounded hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
										)}
									>
										{links.shells.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null}
						</ul>
					</NavigationMenu>
				</div>
				<Button
					variant="secondary"
					className="z-30 py-8 px-6 fixed bottom-4 right-4 !bg-foreground !text-background"
					onClick={toggleMenu}
				>
					{isMenuOpen ? <Cross1Icon className="w-6 h-6" /> : <HamburgerMenuIcon className="w-6 h-6" />}
				</Button>
			</div>
		</>
	);
}
