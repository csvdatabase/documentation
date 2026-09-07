#!/usr/bin/env python3
import argparse
import subprocess
from dataclasses import dataclass


@dataclass(frozen=True)
class Repo:
    name: str
    location: str


def main() -> int:
    parser = argparse.ArgumentParser(description="Print CSDB repo branches.")
    parser.add_argument("mode", choices=["local", "remote"])
    parser.add_argument("repos", nargs="+", help="name=path for local or name=url for remote")
    args = parser.parse_args()

    rows: list[tuple[str, str, str]] = []
    for repo in [parse_repo(raw) for raw in args.repos]:
        branches = local_branches(repo.location) if args.mode == "local" else remote_branches(repo.location)
        rows.extend((repo.name, repo.location, branch) for branch in branches) if branches else rows.append((repo.name, repo.location, "missing"))

    rows.sort(key=lambda row: (row[2].casefold(), row[0].casefold(), row[1]))
    print_table(rows, "Path" if args.mode == "local" else "URL")
    return 0


def parse_repo(raw: str) -> Repo:
    if "=" not in raw:
        raise SystemExit(f"repo must look like name=value: {raw}")
    name, location = raw.split("=", 1)
    return Repo(name, location)


def local_branches(path: str) -> list[str]:
    result = run(["git", "-C", path, "for-each-ref", "--format=%(refname:short)", "refs/heads"])
    return clean_branches(result.stdout.splitlines()) if result.returncode == 0 else []


def remote_branches(url: str) -> list[str]:
    result = run(["git", "ls-remote", "--heads", url])
    if result.returncode != 0:
        return []
    branches = []
    for line in result.stdout.splitlines():
        _, _, ref = line.partition("refs/heads/")
        if ref:
            branches.append(ref)
    return clean_branches(branches)


def clean_branches(branches: list[str]) -> list[str]:
    return sorted(branch for branch in branches if branch and branch != "HEAD")


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, text=True, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)


def print_table(rows: list[tuple[str, str, str]], location_header: str) -> None:
    repo_width = max([len("Repo"), *(len(row[0]) for row in rows)])
    location_width = max([len(location_header), *(len(row[1]) for row in rows)])
    branch_width = max([len("Branch"), *(len(row[2]) for row in rows)])
    print(f"{'Repo':<{repo_width}}  {location_header:<{location_width}}  {'Branch':<{branch_width}}")
    print(f"{'----':<{repo_width}}  {'----':<{location_width}}  {'------':<{branch_width}}")
    for repo, location, branch in rows:
        print(f"{repo:<{repo_width}}  {location:<{location_width}}  {branch:<{branch_width}}")


if __name__ == "__main__":
    raise SystemExit(main())
