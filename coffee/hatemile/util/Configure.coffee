###
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
'use strict'

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.util
#
@hatemile.util or= {}

# The Configure class contains the configuration of HaTeMiLe.
#
class @hatemile.util.Configure
  
  # Initializes a new object that contains the configuration of HaTeMiLe.
  #
  # @param [Object] parameters The JSON configuration.
  #
  constructor: (@parameters) ->
  
  # Returns the parameters of configuration.
  #
  # @return [Object] The parameters of configuration.
  #
  getParameters: () ->
    clonedParameters = {}
    for key, value of @parameters
      clonedParameters[key] = value
    return clonedParameters
  
  # Check that the configuration has an parameter.
  #
  # @param [string] parameter The name of parameter.
  #
  # @return [boolean] True if the configuration has the parameter or false if the configuration not has the parameter.
  #
  hasParameter: (parameter) ->
    return @parameters[parameter] isnt undefined
  
  # Returns the value of a parameter of configuration.
  #
  # @param [string] name The parameter.
  #
  # @return [string] The value of the parameter.
  #
  getParameter: (name) ->
    if not @hasParameter(name)
      throw new Error("Parameter '#{name}' not found.")
    return @parameters[name]
