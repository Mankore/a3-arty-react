import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/catalyst/table";
import { Code } from "@/shared/ui/catalyst/text";

const rows = [
  {
    control: "Shift + LMB",
    description: "Place Artillery",
  },
  {
    control: "CTRL + LMB",
    description: "Place Target",
  },
  {
    control: "RMB / Touch (hold)",
    description: "Open Contexttual Menu",
  },
  {
    control: "LMB / Touch",
    description: "Drag: Move marker",
  },
  {
    control: "DELETE",
    description: "Hover: Delete marker",
  },
];

export const Controls = () => {
  return (
    <section>
      <h1 className="text-3xl">Controls</h1>

      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeader>Control</TableHeader>
            <TableHeader>Description</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ control, description }) => (
            <TableRow key={control}>
              <TableCell>
                <Code>{control}</Code>
              </TableCell>
              <TableCell>{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
