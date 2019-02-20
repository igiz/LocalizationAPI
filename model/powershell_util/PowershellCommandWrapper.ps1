Param (
    [Parameter(Mandatory=$true)][string]$WorkingDirectory,
    [Parameter(Mandatory=$true)][string]$Script,
    [Parameter(Mandatory=$true)][string]$Arguments
 )

Set-Location $WorkingDirectory;
& (Join-Path -Path $WorkingDirectory -ChildPath $Script) $Arguments | Out-File (Join-Path -Path $WorkingDirectory -ChildPath "buildLog.txt");
If ($?) {Exit 0;} Else {Exit 1;};