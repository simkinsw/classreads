import { FC, ReactNode } from "react";

type SidebarLayoutProps = {
    main: ReactNode;
    side: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ main, side }) => {
    return (
        <>
            <div className="w-full lg:mr-[20rem] 2xl:mr-[22rem]">
                {main}
            </div>
            <div className="hidden lg:flex container left-0 right-0 mx-auto fixed justify-end z-0">
                <div className="flex flex-col gap-8 w-[20rem] 2xl:w-[22rem] pl-10 2xl:pl-16 items-stretch">
                    {side}
                </div>
            </div>
        </>      
    )
}

export default SidebarLayout; 