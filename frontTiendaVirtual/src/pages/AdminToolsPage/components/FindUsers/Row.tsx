import { AuthUtils } from "@/utils/AuthUtils";

interface Props {
  username: string;
  email: string;
  isBussiness: boolean;
  isBlocked: boolean;
  onClickCheckBussiness: (username: string) => void;
  onClickCheckBlock: (username: string) => void;
}

export const Row = (props: Props) => {
  const currentUser = AuthUtils.getAuthDetails().username;
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="ps-3">
          <div className="text-base font-semibold">
            {props.username} {props.username === currentUser && "(Usuario actual)"}
          </div>
          <div className="font-normal text-gray-500">{props.email}</div>
        </div>
      </th>

      <td className="px-6 py-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={props.isBussiness}
            onChange={() => props.onClickCheckBussiness(props.username)}
            disabled={props.username === currentUser}
          />
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            ¿Es empresario?
          </span>
        </label>
      </td>

      <td className="px-6 py-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={props.isBlocked}
            onChange={() => props.onClickCheckBlock(props.username)}
            disabled={props.username === currentUser}
          />
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            ¿Está bloqueado?
          </span>
        </label>
      </td>
    </tr>
  );
};
