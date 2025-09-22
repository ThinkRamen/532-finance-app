export const SectionCard = (props: { children: any; class?: string }) => {
    return (
        <div class={`pixel-border p-4 sm:p-6 text-center rounded-lg bg-gray-800 w-full mx-2 sm:mx-4 ${props.class || ''}`}>            {props.children}
        </div>
    )
}