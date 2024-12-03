import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

import { useIllustrationColors } from '@suite-native/atoms';

export const BtcOnlySvg = (props: SvgProps) => {
    const { lineColor, fillColor } = useIllustrationColors();

    return (
        <Svg width={224} height={224} fill="none" {...props}>
            <G clipPath="url(#a)">
                <Path
                    d="m145.306 19.211 8.933 5.612s9.271 7.65 11.764 15.862c2.492 8.215 4.615 21.343.681 35.89-3.935 14.547-13.439 30.249-24.634 40.236 0 0-8.887 9.308-19.295 12.57-10.408 3.263-16.956 4.012-26.199 1.129l-6.867-2.947-3.028-1.105-4.534-2.488 6.385 1.447 56.794-106.206z"
                    fill={fillColor}
                />
                <Path
                    d="M145.846 21.633s21.341 16.11 7.097 56.988c-14.244 40.877-47.456 46.711-47.456 46.711s-24.413 7.172-38.73-16.842c-14.314-24.013 3.328-54.525 6.1-59.525 2.77-4.999 19.98-31.896 45.213-35.486 0 0 14.244-4.517 27.776 8.157v-.003z"
                    fill={fillColor}
                />
                <Path d="M61.536 89.336s.011-.016 0-.016a.008.008 0 0 0 0 .016z" fill={lineColor} />
                <Path
                    d="M63.803 70.657c-2.375 8.486-3.798 17.853-1.94 26.578 1.48 6.949 4.716 13.542 9.617 18.717 4.482 4.735 10.373 8.227 16.678 9.902 6.778 1.8 13.816 1.648 20.545-.287 7.878-2.268 15.073-6.762 21.31-12.007 6.621-5.568 12.21-12.283 16.699-19.667 8.414-13.835 13.968-30.58 11.792-46.9-1.096-8.206-3.837-16.276-9.065-22.79-4.754-5.921-11.452-10.178-18.949-11.573a33.057 33.057 0 0 0-5.518-.543c-.646-.01-.646.992 0 1.004a30.527 30.527 0 0 1 20.397 8.229c5.785 5.406 9.589 12.886 11.033 20.638 1.444 7.752.854 15.653-.569 23.196-1.491 7.913-4.243 15.576-7.981 22.7-7.459 14.226-19.431 27.269-34.222 33.963-12.215 5.526-27.096 5.058-37.77-3.562-5.206-4.206-9.047-9.903-11.237-16.21-1.22-3.513-1.777-7.092-2.303-10.755-.614-4.271-.557-8.585.009-12.856.349-2.616.864-5.207 1.489-7.772.002-.01-.014-.015-.017-.005h.002z"
                    fill={lineColor}
                />
                <Path
                    d="M168.352 51.013c-.185-2.415-.285-4.744-.969-7.077-.629-2.151-1.453-4.234-2.303-6.306-1.582-3.852-3.833-7.512-6.764-10.499-2.104-2.144-4.601-4.227-7.288-5.6-2.165-1.108-4.458-1.906-6.626-3.024a1786.88 1786.88 0 0 1-5.863-3.048c-.418-.22-.791.417-.372.637 1.515.79 3.027 1.584 4.541 2.38 1.245.653 2.523 1.273 3.735 1.985 1.039.61 1.985 1.357 3.031 1.954 2.184 1.245 4.321 2.507 6.179 4.234 3.129 2.907 5.491 6.235 7.656 9.889 1.271 2.143 2.162 4.404 2.874 6.792.365 1.221.58 2.51 1.018 3.707a26.941 26.941 0 0 1 1.142 3.981c0 .007.012.005.012 0l-.003-.005zM68.585 111.449c4.005 5.804 9.156 11.019 15.527 14.176 2.245 1.112 4.636 1.931 6.954 2.881 3.477 1.426 6.939 2.806 10.628 3.614 10.773 2.359 21.572-.77 30.781-6.486 4.159-2.581 8.059-5.68 11.626-9.027 3.587-3.368 7.033-7.082 9.745-11.201 6.034-9.156 10.947-19.246 13.636-29.897.159-.628-.81-.894-.969-.267-2.306 9.14-6.104 18.447-11.791 26.023-5.718 7.619-12.089 14.965-19.976 20.405-8.672 5.98-18.584 10.286-29.31 9.397-4.208-.349-8.143-1.332-12.03-2.961-2.53-1.058-5.1-2.043-7.604-3.16-2.036-.908-3.932-2.115-5.753-3.393-1.793-1.26-3.595-2.535-5.339-3.862-2.312-1.76-4.325-3.974-6.113-6.254-.005-.007-.019 0-.014.009l.002.003zM123.357 19.454s.012-.016 0-.016a.008.008 0 0 0 0 .016z"
                    fill={lineColor}
                />
                <Path
                    d="M132.262 101.79c10.385-11.005 17.507-25.172 19.241-40.275 1.402-12.21-.978-25.586-10.293-34.304-3.852-3.607-8.693-6.09-13.905-6.98-5.596-.952-11.335-.037-16.636 1.863-12.215 4.38-22.059 13.33-29.293 23.913-7.14 10.443-11.9 22.14-13.133 34.793a80.435 80.435 0 0 0-.343 5.866c-.005.215.33.215.334 0 .304-12.94 3.944-25.568 10.916-36.502 6.626-10.392 15.421-19.707 26.562-25.24 10.05-4.992 22.099-6.439 31.8.143 10.083 6.841 14.216 19.487 13.944 31.226-.17 7.39-1.848 14.722-4.514 21.598-2.732 7.047-6.486 13.844-11.171 19.782a72.76 72.76 0 0 1-3.511 4.114c-.002.003 0 .007.005.005l-.003-.002z"
                    fill={lineColor}
                />
                <Path
                    d="M113.67 21.552C102.131 24.369 92.406 32.228 84.936 41.2c-7.815 9.383-13.481 20.636-16.032 32.598-1.992 9.34-1.688 19.402 2.605 28.088 3.534 7.152 9.563 12.502 17.066 15.192 8.864 3.173 18.581 1.884 26.883-2.282.192-.096.023-.386-.169-.288-7.449 3.738-16.055 5.168-24.188 2.984-7.49-2.011-13.9-7.167-17.842-13.804-4.737-7.979-5.652-17.542-4.269-26.58 1.767-11.551 6.724-22.762 13.566-32.194A70.234 70.234 0 0 1 96.998 30.22c5.034-3.798 10.536-7.044 16.673-8.662.002 0 0-.006 0-.004l-.002-.002zM102.627 18.801c-.941.136-1.919.728-2.754 1.173-.836.445-1.7 1.004-2.526 1.53a64.866 64.866 0 0 0-4.898 3.462 71.075 71.075 0 0 0-8.442 7.761c-2.528 2.722-4.93 5.552-7.031 8.616-2.247 3.274-3.986 6.763-5.76 10.307-.037.075.073.14.115.065 1.849-3.33 4.067-6.452 6.26-9.56 2.193-3.108 4.433-6.1 6.98-8.868a70.507 70.507 0 0 1 8.081-7.532 63.214 63.214 0 0 1 5.067-3.62c.829-.534 1.686-1.019 2.521-1.54.836-.523 1.809-.981 2.462-1.674.054-.059 0-.134-.072-.124l-.003.004zM118.765 13.126c1.102.32 2.485.011 3.642.086 1.411.092 2.834-.04 4.252-.011 2.867.058 5.475.861 8.255 1.371.124.024.253-.135.136-.234-2.118-1.774-5.098-2.104-7.789-2.256-1.447-.082-3.015-.162-4.45.08-.821.138-1.596.376-2.427.486-.58.078-1.116.096-1.633.37-.045.023-.033.091.014.105v.003zM168.032 70.43c-.574 1.273-.944 2.469-1.243 3.843-.246 1.119-.754 2.502-.552 3.64.018.098.156.126.22.058.795-.833 1.074-2.322 1.345-3.42.358-1.446.461-2.635.305-4.103-.005-.035-.059-.063-.078-.02l.003.002zM123.104 129.344c-2.874-3.284-7.316-3.869-10.989-5.879-.617-.34-1.224.452-.746.966.861.932 1.744 1.859 2.509 2.872.765 1.014 1.404 2.128 2.134 3.174l.782-.604a31.964 31.964 0 0 0-3.82-2.956c-.784-.515-2.272-1.807-3.316-1.376-.922.379-.798 1.325-.304 1.992 1.034 1.392 2.277 2.506 2.703 4.262l.417-.733c-1.14.41-2.559-.609-3.56-1.088-.855-.41-1.706-.822-2.579-1.189-1.772-.747-3.509-1.351-5.449-1.36-.517-.002-.794.555-.569.99.37.711.237 1.14.241 1.875.005.641.288 1.175.646 1.687l1.065-.821c-1.095-.901-2.347-1.709-3.51-2.545-1.26-.905-2.528-1.71-3.916-2.408-.218-.11-.496.19-.279.363 1.063.842 2.142 1.65 3.22 2.471.635.483 1.26.979 1.873 1.487.613.508 1.074 1.081 1.65 1.594.541.479 1.54-.16 1.065-.822-.475-.662-.433-1.016-.416-1.762.014-.653-.204-1.213-.506-1.779l-.569.99c2.364-.014 4.473.756 6.579 1.753 1.51.714 3.591 2.23 5.325 1.718.328-.096.475-.41.416-.733a4.6 4.6 0 0 0-1.001-2.179 55.14 55.14 0 0 0-.934-1.107c-.159-.185-.971-.877-.962-1.107.037-1.215 1.521-.047 1.783.122.461.297.913.608 1.353.936.967.721 1.826 1.552 2.647 2.432.389.416 1.065-.117.782-.604-1.304-2.24-3.003-4.388-4.634-6.413l-.747.967c3.537 2.038 8.056 2.46 11.082 5.343.351.335.843-.169.527-.527l.007-.002zM164.441 37.338c-1.521-1.093-3.419-1.84-5.106-2.654-1.688-.815-3.492-1.578-5.154-2.535l-.131.995c1.36-.482 2.57-1.161 3.733-2.008.201-.148.213-.415 0-.557-1.882-1.278-3.59-2.554-5.018-4.351l-.468.802c1.474.274 2.609.115 4.044-.238.208-.052.311-.36.133-.508-1.083-.903-2.34-1.346-3.679-1.737-1.481-.43-3.78-.786-4.529-2.317l-.306.756 1.795-.473c.531-.14.295-.884-.222-.805l-1.847.286c-.449.07-.482.74-.124.94 1.283.721 2.415 1.37 3.843 1.789 1.629.48 3.319.854 4.639 1.99l.133-.509c-1.114.176-2.513.059-3.625-.1-.473-.068-.796.416-.468.802 1.456 1.709 3.283 3.347 5.371 4.23v-.557c-1.217.543-2.462 1.02-3.698 1.516-.477.192-.552.885 0 1.049 1.95.58 3.785 1.467 5.634 2.315 1.608.737 3.208 1.703 4.887 2.26.238.08.341-.252.161-.381h.002z"
                    fill={lineColor}
                />
                <Path
                    d="M132.227 49.632a29.147 29.147 0 0 0-3.129-3.382c-.061-.056-.176-.063-.255.026a170.059 170.059 0 0 0-4.499 5.243c-.411.5-1.53 2.233-2.092 2.35l-.527-.363c-.208-.276-.404-.634-.543-.803-.278-.335-.554-.67-.833-1.002 1.084-1.324 2.168-2.647 3.249-3.971.569-.693 1.137-1.386 1.708-2.072.541-.648 1.136-1.566 1.777-2.013.152-.107.203-.32.107-.444a97.755 97.755 0 0 0-2.841-3.424c-.044-.129-.18-.202-.304-.063-1.781 1.968-3.429 4.17-5.184 6.183-.393.452-.801.894-1.224 1.297-.075.07-.178.208-.26.24a.481.481 0 0 0-.084.043c.002-.012-.005-.028-.057-.052-.049-.02-.25-.458-.316-.547-.17-.234-.344-.47-.514-.705-1.292-1.762-2.629-3.48-3.865-5.308-.175-.26-.493-.019-.554.26-.77.69-1.489 1.65-2.17 2.476-.81.983-1.598 1.992-2.382 3.01-.153.197-.092.433.037.515.8.512 1.781 1.165 2.284 2.193.209.618.363 1.388.253 2.134-.262 1.121-1.151 2.008-1.872 2.842-.955 1.102-1.891 2.235-2.832 3.356-1.412 1.683-2.748 3.46-4.171 5.123-1.498 1.75-3.036 3.46-4.536 5.215-1.17 1.369-2.336 2.717-3.445 4.161 0 .002 0 .005-.005.007-.489.508-.976 1.025-1.49 1.468-.75.381-1.452.465-1.98-.288a4.774 4.774 0 0 1-.249-.403c-.278-.89-.552-2.193-1.52-1.325-.893.803-1.9 1.657-2.8 2.6l-.047.04-.028.038c-.417.44-.812.899-1.159 1.383-.037.054-.06.152-.028.197.784 1.123 1.349 2.434 2.032 3.658.641 1.147 1.27 2.3 1.842 3.515-.925.756-1.779 2.08-2.549 3.036-1.055 1.308-2.078 2.668-3.134 3.983-.091.113-.129.342-.063.438.74 1.095 1.38 2.315 2.165 3.356.103.138.32.04.44-.114a59.46 59.46 0 0 1 3.07-3.675c.735-.812 1.697-1.596 2.308-2.572.564.67 1.037 1.416 1.447 2.258-.932 1.023-1.819 2.142-2.708 3.22-1.037 1.258-2.104 2.533-3.017 3.933-.08.121-.082.257-.014.341.812 1.01 1.58 2.067 2.23 3.261.09.161.3.152.438-.045 1.669-2.385 3.518-4.486 5.575-6.265.775 1.261 1.748 2.401 2.734 3.375 1.041 1.032 2.2 1.772 3.581 2.146 1.224.33 2.459.22 3.819-.358 1.407-.6 2.919-1.264 4.251-2.282.69-.527 1.427-.913 2.092-1.495a13.572 13.572 0 0 0 1.893-2.081c.15-.2.293-.405.433-.613l.049-.066c1.957-2.706 2.563-5.626 2.575-7.398.007-1.325-.349-2.907-.604-3.757.414.113.885.127 1.376.075.026 0 .052-.004.078-.007l.072-.007c.255-.026.51-.075.763-.147a10.75 10.75 0 0 0 2.799-1.163c.658-.391 1.299-.857 1.915-1.39.302-.244.599-.523.889-.84a15.665 15.665 0 0 0 2.708-3.774c.206-.405.407-.828.599-1.261.494-1.007.883-2.004 1.046-2.865.459-1.6.703-3.223.555-4.655-.26-2.516-1.158-5.105-2.401-6.888l-.073-.162.265-.339a21.74 21.74 0 0 0 1.076-1.128c.656-.77 1.281-1.58 1.887-2.409.519-.709 1.055-1.556 1.629-2.35l.739-.947a8.34 8.34 0 0 1 .644-.681c.136-.096.302-.227.442-.368.124-.091.248-.178.375-.252.173-.101.213-.356.114-.48l-.002.004zM107.942 66.04c1.019-1.191 2.018-2.415 3.043-3.597 1.304-1.503 2.671-2.874 3.995-4.332 1.416 1.366 2.472 3.267 3.12 5.432.328 1.095.66 2.375.414 3.719-.266 1.46-1.289 2.813-2.251 3.815-.833.868-1.802 1.58-2.776 1.64-1.114.07-2.177-.64-2.993-1.303-.813-.658-1.569-1.412-2.126-2.401-.379-.677-.697-1.372-1.242-1.814.266-.389.536-.775.812-1.159h.004zm-9.015 21.43c-.93-.78-1.702-1.791-2.397-2.877-.362-.566-.702-1.159-1.043-1.746-.162-.276-.412-.496-.323-.934v-.005s0 .003.002.005c.133-.33.653-.817.875-1.093.365-.456.723-.917 1.082-1.38.673-.869 1.364-1.716 2.05-2.568l2.059-2.558c.424-.527.937-1.068 1.353-1.655a.62.62 0 0 1 .166.035c.305-.133.501-.052.59.246.126.133.222.332.328.491.573.862 1.154 1.725 1.657 2.664.208.386.402.786.59 1.193.131.321.255.646.372.976.852 2.416 1.266 5.85-.637 8.674-2.066 3.07-5.044 1.945-6.726.534l.002-.003zM53.585 19.59c-1.318-1.418-2.893-2.694-4.428-3.878-.688-.531-1.395-1.123-2.162-1.535-.323-.173-.712.269-.41.53 2.148 1.852 4.17 3.905 6.553 5.464.36.236.723-.281.447-.578v-.003zM63.92 27.918c-1.827-1.99-4.301-3.581-6.543-5.075-.328-.217-.667.26-.41.532.852.898 1.821 1.68 2.828 2.396 1.242.887 2.4 1.891 3.679 2.725.362.236.72-.281.447-.578zM28.006 63.111c-1.428-.43-3.202-.433-4.674-.292-.355.032-.487.57-.089.664 1.477.347 3.26.578 4.763.34.38-.061.32-.614 0-.712zM39.704 64.01a36.076 36.076 0 0 0-8.136-.637c-.36.014-.482.595-.089.665 2.596.463 5.489.857 8.127.695.39-.023.529-.639.098-.723zM51.462 64.672c-2.476-.25-4.99-.489-7.485-.365-.358.019-.484.595-.088.665 1.755.309 3.536.393 5.312.48.796.04 1.57.082 2.36-.056.44-.078.283-.686-.099-.724zM196.101 19.873c-1.912 1.007-4.007 1.765-5.973 2.662-4.702 2.146-9.434 4.229-14.052 6.553-.337.168-.098.763.26.618 4.788-1.929 9.474-4.1 14.164-6.254 1.992-.915 4.126-1.739 5.971-2.942.398-.26.049-.859-.372-.637h.002zM171.25 106.777c-.246-.306-.632-.372-.99-.487a2.423 2.423 0 0 0-1.095-.107c-.253.035-.323.407-.15.564.281.255.618.407.978.51.361.103.712.253 1.093.133.283-.088.337-.4.162-.615l.002.002zM190.247 112.502c-.971-.246-1.909-.665-2.867-.962-3.686-1.149-7.365-2.364-11.124-3.253-.428-.101-.583.501-.18.651 3.644 1.364 7.398 2.434 11.117 3.576.964.297 1.95.601 2.958.711.417.045.494-.625.099-.723h-.003zM187.018 70.44c-1.77-.335-3.649-.399-5.451-.41-.791-.005-1.62-.029-2.404.1-.398.066-.264.637.089.665 2.539.194 5.121.573 7.667.37.386-.03.534-.642.099-.724v-.002zM201.147 71.24c-3.134-.52-6.516-.66-9.694-.534-.361.014-.485.604-.089.665 3.141.48 6.516.746 9.685.594.39-.019.528-.653.098-.723v-.002z"
                    fill={lineColor}
                />
                <Path
                    d="M149.441 211.001H77.528l.082-36.912s-12.243 1.505-17.076-8.515c-4.833-10.021 1.826-19.468 3.42-21.382 1.593-1.915 9.422-9.119 9.422-9.119l-.02-5.034s-1.012-2.209 4.165-2.153c5.177.056 71.49 0 71.49 0s4.599-1.044 4.875 2.858l.126 4.365s13.554 12.046 14.038 18.431c.485 6.385.153 14.824-9.675 19.302 0 0-4.831 2.136-8.461.809l-.297 2.418-.171 34.932h-.005z"
                    fill={fillColor}
                />
                <Path
                    d="M73.025 134.554c-6.347 4.496-12.425 10.537-14.651 18.206-2.022 6.973.337 14.085 6.113 18.476 5.346 4.065 12.398 4.651 18.399 1.683 5.57-2.755 10.263-8.622 11.12-14.869.896-6.518-4.712-11.482-10.65-12.723-3.323-.695-6.907-.281-9.774 1.631-3.01 2.009-4.64 5.4-4.85 8.964-.193 3.343.928 6.891 3.34 9.269 2.414 2.378 5.936 3.279 9.051 2.167s5.004-4.33 5.334-7.614c.305-3.026-.79-6.602-3.726-7.983-2.785-1.311-6.408-.204-7.796 2.593-1.294 2.612-.564 6.273 2.17 7.644 2.343 1.175 4.931.024 5.048-2.68.087-1.982-.875-4.671-2.706-5.675-.812-.447-1.724-.379-2.48.143-.738.507-.043 1.72.706 1.21 1.58-1.075 2.699 1.977 2.921 3.066.143.695.24 1.652-.168 2.286-.773 1.203-2.58.574-3.415-.206-2.27-2.111-1.196-6.155 1.613-7.143 2.808-.988 5.397.906 6.125 3.665.707 2.675.035 5.933-1.929 7.93-2.137 2.172-5.697 2.205-8.222.714-5.327-3.148-5.78-11.698-1.622-15.941 3.988-4.073 10.63-3.499 15.103-.597 2.146 1.392 3.902 3.468 4.51 5.989.627 2.603-.166 5.343-1.287 7.703-2.26 4.755-6.427 8.687-11.503 10.246-5.243 1.61-10.926.314-15.038-3.293-2.2-1.931-3.93-4.423-4.78-7.239-1-3.326-.643-6.879.509-10.118 2.406-6.773 8.03-11.899 13.32-16.481.552-.48-.183-1.454-.79-1.023h.005z"
                    fill={lineColor}
                />
                <Path
                    d="M73.133 135.347c.414-.046.824.007 1.233.059.855.105 1.732.047 2.594.044 2.721 0 5.443.026 8.165.054 6.769.073 13.538.08 20.306.124 2.727.019 5.566.183 8.269-.213.302-.044.302-.564 0-.608-2.357-.347-4.817-.265-7.194-.274-3.298-.014-6.594-.033-9.891-.047-6.322-.028-12.641-.051-18.96.047-1.531.023-3.088-.007-4.585.349-.253.06-.206.496.063.465z"
                    fill={lineColor}
                />
                <Path
                    d="M73.732 135.073c.023-1.722-.337-3.847.173-5.516.232-.758.864-.964 1.566-.999.742-.04 1.488-.026 2.233-.031 2.916-.019 5.832-.007 8.75.005 7.127.028 14.256-.061 21.383-.157 1.306-.019 2.612-.023 3.918-.044.571-.01 1.402-.258 1.863-.232.19.012.19-.286 0-.297-.416-.024-1.116-.26-1.638-.293-1.196-.072-2.406-.058-3.604-.082a680.397 680.397 0 0 0-10.591-.124c-6.862-.03-13.725-.009-20.587.171-.695.019-1.404.012-2.097.084-1.285.136-1.982.756-2.177 2.046-.271 1.8-.206 3.777.115 5.563.073.403.693.295.698-.094h-.005zM113.616 139.626c-5.5-.319-11.073-.068-16.582-.068-5.458 0-10.996-.269-16.44.175-4.566.375-9.256 1.587-12.71 4.763-3.291 3.024-5.74 7.686-5.957 12.185-.218 4.472 2.918 8.849 6.941 10.583.26.113.494-.25.23-.393-3.677-1.954-5.734-5.727-5.662-9.853.042-2.334.897-4.684 1.88-6.776.983-2.092 2.176-3.836 3.857-5.278 3.62-3.103 8.564-3.995 13.184-4.231 4.88-.251 9.792-.136 14.68-.169 5.509-.035 11.081.183 16.581-.173.494-.033.496-.742 0-.77l-.002.005zM77.009 174.089c-.297 4.131-.052 8.36-.047 12.498.007 6.221-.014 12.444.063 18.668.014 1.109.033 2.23.096 3.337.028.492.18 1.248.154 1.618-.03.43.642.428.672 0 .082-1.173.255-2.715.3-4.024.096-2.82.03-5.652.033-8.475 0-6.223-.075-12.444-.09-18.667-.004-1.643-.086-3.314.026-4.955.052-.775-1.149-.77-1.205 0h-.002z"
                    fill={lineColor}
                />
                <Path
                    d="M77.633 180.46c5.966-.88 11.937-1.709 17.964-2.027 6.218-.328 12.453-.286 18.679-.281.723 0 .725-1.126 0-1.126-12.395.01-24.657.204-36.853 2.671-.506.103-.281.833.21.761v.002zM93.275 140.248c1.872.337 3.768.169 5.594.838 1.825.669 3.225 1.884 4.882 2.722 2.984 1.512 6.513 2.373 9.865 2.207.784-.04.793-1.215 0-1.224-3.771-.047-7.384-.732-10.682-2.64-1.486-.861-2.921-1.737-4.627-2.083-1.608-.325-3.42-.419-5.032-.105-.14.028-.143.259 0 .285zM79.74 140.276c6.179.588 11.974 1.973 17.282 5.318 2.5 1.575 4.73 2.979 7.679 3.546a39.69 39.69 0 0 0 4.515.589c1.512.113 3.07.277 4.533.015.482-.087.499-.92 0-.99-1.488-.209-3.031-.103-4.533-.227-1.69-.141-3.389-.359-5.044-.728-3.024-.677-5.306-2.573-7.955-4.045-4.887-2.715-10.874-4.346-16.48-3.716-.152.016-.154.222 0 .236l.003.002zM77.027 146.216c3.321-.103 6.565-.173 9.819.637 3.253.81 6.094 2.394 8.961 4.129 2.626 1.589 5.395 2.778 8.428 3.325 3.033.548 6.376.834 9.381.457.664-.084.678-.974 0-1.046-1.622-.174-3.303-.017-4.936-.085-1.634-.067-3.298-.227-4.915-.571-3.31-.704-6.104-2.3-9.009-3.96-5.177-2.958-11.856-4.875-17.761-3.115-.125.038-.106.236.03.232l.002-.003zM153.327 135.579c4.683 4.056 9.441 8.419 12.268 14.031 2.771 5.503 3.013 11.925-.683 17.043-3.169 4.389-8.47 7.055-13.893 6.727-5.423-.328-10.272-3.49-13.35-7.806-2.916-4.091-4.868-9.743-1.512-14.155 3.174-4.175 9.526-6.106 14.452-4.311 6.074 2.212 8.002 9.931 4.801 15.269-1.491 2.486-4.122 4.11-7.066 3.951-3.282-.175-5.414-2.682-6.039-5.762-.575-2.841.225-6.832 3.441-7.698 3.216-.866 6.319 2.135 5.432 5.435-.379 1.411-1.641 2.813-3.23 2.698-1.271-.091-1.568-1.154-1.502-2.23.072-1.161 1.24-4.988 3.019-3.78.749.51 1.446-.702.707-1.21-3.675-2.535-7.157 5.97-3.914 8.163 2.559 1.73 5.681-.72 6.364-3.246.829-3.054-.821-6.263-3.857-7.218-3.036-.955-6.209.726-7.443 3.67-1.233 2.944-.793 6.752 1.051 9.392 1.845 2.64 5.315 3.78 8.529 2.991 3.262-.802 5.633-3.41 6.764-6.492 1.219-3.323.985-7.223-.688-10.347-1.674-3.125-4.915-5.1-8.412-5.582-5.921-.815-13.025 2.544-15.026 8.423-1.027 3.019-.274 6.116.951 8.952a21.224 21.224 0 0 0 5.83 7.834c5.039 4.21 12.023 5.804 18.208 3.272 6.039-2.472 10.717-8.278 11.005-14.911.356-8.154-5.081-15.499-10.937-20.606a55.911 55.911 0 0 0-4.477-3.524c-.601-.426-1.348.54-.789 1.022l-.004.005z"
                    fill={lineColor}
                />
                <Path
                    d="M154.071 134.882c-1.524-.345-3.146-.314-4.7-.337-3.466-.052-6.93-.073-10.396-.092-8.405-.047-16.814.038-25.219.07-3.155.012-6.391-.105-9.528.27-.405.049-.407.582 0 .632 2.706.32 5.491.213 8.213.208 3.986-.005 7.972-.045 11.958-.063 7.931-.04 15.863-.106 23.793-.12 1.327-.002 2.696.099 4.016-.014.597-.051 1.198-.166 1.8-.091.264.033.32-.407.063-.466v.003z"
                    fill={lineColor}
                />
                <Path
                    d="M154.106 135.167c.173-1.1.243-2.184.229-3.298-.011-.987.073-2.218-.358-3.143-.393-.847-1.184-1.088-2.057-1.161-.817-.068-1.645-.056-2.462-.072-3.801-.078-7.604-.117-11.408-.157-9.998-.11-20.001-.077-30 .075-1.821.028-3.642.056-5.463.093-.779.017-1.776.263-2.417.3-.19.012-.19.307 0 .297.423-.026 1.287.199 1.842.227 1.404.07 2.827.021 4.234.035 4.304.042 8.608.085 12.912.103 9.278.045 18.555.024 27.833.04 1.357.002 2.717.002 4.075.026.302.005.61-.002.91.026 1.278.117 1.322 1.158 1.388 2.169.094 1.447.054 2.9.042 4.349-.002.388.634.501.698.093l.002-.002zM113.525 140.396c4.901.316 9.867.138 14.78.161 4.903.026 9.813-.007 14.714.113 4.655.114 9.517.646 13.519 3.234 3.78 2.444 6.162 6.958 6.977 11.314.873 4.671-1.245 9.406-5.472 11.653-.265.141-.033.506.229.393 3.621-1.561 6.343-5.107 6.883-9.029.604-4.368-1.881-9.313-4.695-12.498-3.11-3.523-7.515-5.206-12.088-5.807-5.273-.698-10.712-.375-16.018-.372-6.256 0-12.587-.293-18.832.07-.496.028-.496.737 0 .77l.003-.002zM148.929 174.089c.281 4.131.014 8.36-.007 12.498-.033 6.221-.122 12.447-.049 18.668.018 1.624.22 3.468.323 4.954.03.429.702.433.671 0-.021-.287.106-.938.139-1.348.07-.887.06-1.785.088-2.675.092-2.82.047-5.652.066-8.475.04-6.221.033-12.444.021-18.667-.002-1.643.073-3.314-.047-4.955-.056-.768-1.257-.777-1.205 0z"
                    fill={lineColor}
                />
                <Path
                    d="M149.718 179.699c-12.197-2.467-24.456-2.663-36.853-2.67-.724 0-.726 1.125 0 1.125 6.225-.004 12.46-.049 18.679.281 6.027.319 11.997 1.147 17.963 2.027.489.073.716-.66.211-.76v-.003zM133.863 139.963c-1.61-.314-3.424-.22-5.032.105-1.708.346-3.138 1.222-4.627 2.083-3.298 1.91-6.909 2.596-10.682 2.64-.791.009-.784 1.187 0 1.224 3.354.166 6.881-.695 9.865-2.207 1.657-.84 3.127-2.078 4.883-2.722 1.755-.644 3.721-.501 5.593-.838.143-.026.141-.257 0-.285zM147.398 140.04c-5.605-.63-11.592 1.002-16.479 3.717-2.649 1.472-4.931 3.363-7.955 4.044-1.655.372-3.356.585-5.044.728-1.503.126-3.045.021-4.533.227-.499.07-.483.903 0 .99 1.462.262 3.056.096 4.533-.014a40.75 40.75 0 0 0 4.515-.59c2.949-.564 5.182-1.971 7.679-3.546 5.306-3.347 11.105-4.73 17.282-5.317a.119.119 0 0 0 0-.237l.002-.002zM150.144 145.985c-5.905-1.76-12.585.157-17.762 3.115-2.905 1.659-5.697 3.258-9.009 3.96-1.617.344-3.265.501-4.915.571-1.65.07-3.314-.089-4.936.084-.676.073-.667.965 0 1.046 2.945.37 6.27.078 9.187-.423 3.105-.534 5.935-1.734 8.622-3.359 2.687-1.624 5.559-3.255 8.763-4.079 3.316-.852 6.623-.789 10.015-.686.135.005.156-.194.03-.232l.005.003zM92.418 160.912c1.203.698 3.16.41 4.517.445 1.781.044 3.563.087 5.344.084a292.69 292.69 0 0 0 5.109-.047c1.701-.03 3.543.066 5.151-.449.145-.047.157-.264 0-.304-1.558-.412-3.321-.267-4.919-.255-1.781.011-3.563.009-5.344-.005-1.781-.014-3.407-.014-5.109-.037-1.42-.019-3.452-.433-4.749.208-.143.07-.128.283 0 .358v.002zM117.653 160.961c5.374.389 10.839.326 16.227.213.737-.016.709-1.053 0-1.125-2.119-.213-4.328-.003-6.453.058-3.258.094-6.518.222-9.774.382-.306.014-.304.451 0 .472zM77.992 190.482c.145-.15.472-.693.596-.77.216-.134.574.011.871.025.126.005.39-.058.5-.021.3.101-.105-.156-.083.129.04.552-.197 1.227-.31 1.772-.39 1.9-.629 3.784-.713 5.725a96.246 96.246 0 0 0-.059 6.628c.026 1.041.054 2.085.131 3.124.094 1.243-.028 2.495.096 3.733.047.466.716.483.738 0 .06-1.42-.138-2.874-.15-4.299-.012-1.273-.075-2.546-.087-3.822-.026-2.694.038-5.397.33-8.075.112-1.034.281-2.059.417-3.089.107-.824.65-1.982.044-2.696-.491-.578-1.186-.503-1.844-.258-.215.08-.192.134-.433.209-.162.051-.335.009-.496.086-.38.18-.534.576-.665.953-.222.639.67 1.114 1.114.648l.002-.002zM97.242 189.136c-2.256-1.791-3.178 3.136-3.164 4.568.004.497.011.991.046 1.487.117 1.605.14 3.216.162 4.826.019 1.448.033 2.9.042 4.348l.021 3.195c.007 1.14-.157 2.413.147 3.515.073.267.469.267.541 0 .45-1.636.138-3.676.138-5.373 0-1.379-.002-2.76-.01-4.138-.006-1.531-.01-3.059-.05-4.59-.02-.782-.097-1.561-.12-2.343-.012-.355-.007-.709-.012-1.065-.004-.416-.044-.826-.063-1.242-.035-.77.087-1.678.775-2.109.384-.241.89-.187 1.327-.26.346-.056.494-.601.218-.821l.002.002z"
                    fill={lineColor}
                />
                <Path
                    d="M96.1 189.957c.342.057.737.036 1.065.129.906.262 1.046 1.248 1.046 2.057.002 1.114-.08 2.238-.08 3.357 0 1.849 0 3.698.014 5.547.012 2.031.026 4.065.096 6.096.043 1.248-.025 2.727.312 3.935.075.267.468.267.54 0 .27-.969.047-2.067.005-3.062-.161-3.899-.096-7.81-.073-11.711.012-1.854.256-3.885-.493-5.636-.475-1.109-1.355-2.561-2.65-1.533-.278.22-.13.765.218.821zM114.18 189.136c-2.256-1.791-3.179 3.136-3.164 4.568.004.497.011.991.046 1.487.117 1.605.141 3.216.162 4.826.019 1.448.033 2.9.042 4.348l.021 3.195c.007 1.14-.157 2.413.147 3.515.073.267.469.267.541 0 .45-1.636.138-3.676.138-5.373 0-1.379-.002-2.76-.009-4.138-.007-1.531-.012-3.059-.052-4.59-.018-.782-.096-1.561-.119-2.343-.012-.355-.007-.709-.012-1.065-.004-.416-.044-.826-.063-1.242-.035-.77.087-1.678.775-2.109.384-.241.889-.187 1.327-.26.346-.056.494-.601.218-.821l.002.002z"
                    fill={lineColor}
                />
                <Path
                    d="M113.038 189.957c.342.057.737.036 1.065.129.906.262 1.046 1.248 1.046 2.057.002 1.114-.08 2.238-.08 3.357 0 1.849 0 3.698.014 5.547.012 2.031.026 4.065.096 6.096.043 1.248-.025 2.727.312 3.935.075.267.468.267.54 0 .27-.969.047-2.067.005-3.062-.161-3.899-.096-7.81-.073-11.711.012-1.854.256-3.885-.493-5.636-.475-1.109-1.355-2.561-2.65-1.533-.278.22-.131.765.218.821zM132.227 189.136c-2.256-1.791-3.178 3.136-3.164 4.568.005.497.012.991.047 1.487.117 1.605.14 3.216.161 4.826.019 1.448.033 2.9.042 4.348l.021 3.195c.007 1.14-.156 2.413.148 3.515.072.267.468.267.54 0 .45-1.636.139-3.676.139-5.373 0-1.379-.003-2.76-.01-4.138-.007-1.531-.011-3.059-.051-4.59-.019-.782-.096-1.561-.12-2.343-.011-.355-.007-.709-.011-1.065-.005-.416-.045-.826-.064-1.242-.035-.77.087-1.678.775-2.109.384-.241.89-.187 1.327-.26.347-.056.494-.601.218-.821l.002.002z"
                    fill={lineColor}
                />
                <Path
                    d="M131.085 189.957c.342.057.737.036 1.065.129.906.262 1.046 1.248 1.046 2.057.002 1.114-.079 2.238-.079 3.357 0 1.849 0 3.698.014 5.547.011 2.031.025 4.065.096 6.096.042 1.248-.026 2.727.311 3.935.075.267.468.267.54 0 .27-.969.047-2.067.005-3.062-.161-3.899-.096-7.81-.072-11.711.011-1.854.255-3.885-.494-5.636-.475-1.109-1.355-2.561-2.65-1.533-.278.22-.131.765.218.821zM148.929 189.136c-2.256-1.791-3.178 3.136-3.164 4.568.004.497.011.991.046 1.487.117 1.605.141 3.216.162 4.826.019 1.448.033 2.9.042 4.348l.021 3.195c.007 1.14-.157 2.413.148 3.515.072.267.468.267.54 0 .45-1.636.138-3.676.138-5.373 0-1.379-.002-2.76-.009-4.138-.007-1.531-.012-3.059-.052-4.59-.018-.782-.096-1.561-.119-2.343-.012-.355-.007-.709-.012-1.065-.004-.416-.044-.826-.063-1.242-.035-.77.087-1.678.775-2.109.384-.241.889-.187 1.327-.26.346-.056.494-.601.218-.821l.002.002zM69.196 211.174c-.183-.073-.325-.129-.255-.106-.286-.096-.302-.245-.047.022l-.218.823c-.22.052.232.04.326.052.358.037.707.03 1.065.014.987-.045 1.975-.082 2.963-.119 1.51-.057 3.021-.153 4.53-.185 1.97-.045 3.94.154 5.906.259 2.221.12 4.435.054 6.659.012l14.187-.274c2.636-.051 5.271-.103 7.909-.152l4.187-.082c1.259-.023 2.628.089 3.85-.245.449-.122.473-.822 0-.934-1.025-.241-2.106-.138-3.153-.122-1.317.023-2.635.044-3.953.068l-7.211.124-14.65.25c-2.269.04-4.544.138-6.812.045-2.022-.084-4.037-.293-6.061-.323-1.69-.026-3.394.112-5.082.203-1.116.061-2.232.113-3.346.192-.494.035-1.248.038-1.69.323-.29.19-.35.677 0 .852.41.206.669-.042.898-.138.267-.11.274-.442 0-.552l-.002-.007z"
                    fill={lineColor}
                />
                <Path
                    d="M124.682 211.108c1.086.541 2.745.295 3.939.316 1.57.026 3.14.054 4.711.084 3.024.057 6.045.075 9.067.036 2.698-.036 5.397-.075 8.093-.127 1.107-.021 2.217-.047 3.324-.077.913-.026 1.917.019 2.661-.573.274-.218.136-.628-.103-.792-.751-.519-1.835-.372-2.701-.351-1.114.028-2.231.052-3.347.073-2.708.049-5.416.084-8.124.117-2.96.035-5.916.124-8.872.248-1.503.063-3.006.126-4.51.192-1.241.054-3.036-.162-4.143.433-.157.084-.164.344 0 .426l.005-.005zM44.7 109.958c-4.624 1.645-9.244 3.724-13.597 6.001-.333.173-.103.754.26.618 4.605-1.72 9.263-3.675 13.621-5.945.365-.19.112-.814-.283-.674zM53.452 106.152c-1.692.372-3.504 1.267-4.964 2.189-.32.201-.117.716.26.618 1.67-.438 3.564-1.157 4.987-2.133.342-.236.136-.765-.283-.674z"
                    fill={lineColor}
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" transform="translate(23 12)" d="M0 0h178.412v200H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};