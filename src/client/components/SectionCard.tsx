export const SectionCard = (props: { children: any; class?: string }) => {
    return (
        <div class={`pixel-border p-4 text-center rounded-xl bg-gray-800 max-w-xl ${props.class || ''}`}>
            {props.children}
        </div>
    )
}