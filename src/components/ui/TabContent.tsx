// MUIのTabsコンポーネントに対応する、Tabの選択中indexによって表示が切り替わるコンテンツ
export default function TabContent({
    value,
    index,
    children,
}: {
    value: number;
    index: number;
    children: React.ReactNode;
}) {
    return (
        <>
            {value === index && children}
        </>
    );
}
