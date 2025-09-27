export const SectionCard = (props: { children: any; class?: string }) => {
    return (
        <div class={`pixel-border p-4 text-center rounded-3xl bg-gray-800 max-w-xl flex ${props.class || ''}`}>
            <div class="items-center justify-center w-full">{props.children}</div>
        </div>
    )
}