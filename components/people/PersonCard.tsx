import getImagePath from "@/lib/getImagePath";
import { Actor } from "@/lib/getPerson";
import Image from "next/image";
import Link from "next/link";

function PersonCard({person}: {person: Actor}) {
  var strs: string[] = [];
  for (const known of person.known_for) {
    if (known.name != undefined)
      strs.push(known.name)
    else if (known.title != undefined)
      strs.push(known.title)
  }

  return (
    <div className="min-w-80 rounded-xl shadow-sm shadow-blue-200">
      <Link href={`/people/${person.id + "-" + person.name.replaceAll(" ", "-")}`}>
        <Image src={getImagePath(person.profile_path)}
              className="w-full h-96 object-cover object-top rounded-t-xl"
              alt={person.name}
              width={300}
              height={320} />
      </Link>
      <div className="p-3">
        <h1 className="text-xl font-semibold">{person.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{strs.join(", ")}</p>
      </div>
    </div>
  )
}

export default PersonCard;